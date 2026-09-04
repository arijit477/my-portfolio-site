import { Component, ElementRef, OnInit, OnDestroy, ViewChild, NgZone } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-background',
  standalone: true,
  template: `<canvas #webglCanvas class="webgl-canvas"></canvas>`,
  styles: [`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      pointer-events: none;
    }
    .webgl-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class ThreeBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('webglCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private particlesVelocities: { x: number; y: number; z: number }[] = [];
  private linesMesh!: THREE.LineSegments;
  private floatingObjects: THREE.Mesh[] = [];
  private floatingGroup!: THREE.Group;
  private dust!: THREE.Points;
  private clock = new THREE.Clock();
  private animationFrameId: number | null = null;

  private mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  private scrollY = 0;
  private targetScrollY = 0;

  private resizeHandler = () => this.onResize();
  private mouseMoveHandler = (e: MouseEvent) => this.onMouseMove(e);
  private scrollHandler = () => this.onScroll();

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.initScene();
    this.bindEvents();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.resizeHandler);
    window.removeEventListener('mousemove', this.mouseMoveHandler);
    window.removeEventListener('scroll', this.scrollHandler);

    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initScene(): void {
    const canvas = this.canvasRef.nativeElement;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x070913, 0.0018);

    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(60, aspect, 1, 2000);
    this.camera.position.z = 600;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x070913, 0.0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f0ff, 3, 900);
    pointLight1.position.set(200, 200, 300);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8a2be2, 3, 900);
    pointLight2.position.set(-200, -200, 200);
    this.scene.add(pointLight2);

    this.createNeuralNetwork();
    this.createFloatingGeometries();
    this.createDust();

    // Run animation outside Angular zone for high 60fps performance
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  private createNeuralNetwork(): void {
    const pCount = window.innerWidth < 768 ? 130 : 250;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(pCount * 3);
    const colors = new Float32Array(pCount * 3);

    const color1 = new THREE.Color(0x00f0ff);
    const color2 = new THREE.Color(0x8a2be2);
    const color3 = new THREE.Color(0x38bdf8);

    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 900;
      positions[i3 + 1] = (Math.random() - 0.5) * 650;
      positions[i3 + 2] = (Math.random() - 0.5) * 450;

      const mixedColor = Math.random() > 0.5 
        ? color1.clone().lerp(color2, Math.random()) 
        : color2.clone().lerp(color3, Math.random());

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      this.particlesVelocities.push({
        x: (Math.random() - 0.5) * 0.28,
        y: (Math.random() - 0.5) * 0.28,
        z: (Math.random() - 0.5) * 0.28
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(0,240,255,0.8)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const pTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 7,
      map: pTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    // Line segments
    const maxLines = pCount * pCount;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    this.linesMesh = new THREE.LineSegments(
      linesGeometry,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.38,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    this.scene.add(this.linesMesh);
  }

  private createFloatingGeometries(): void {
    this.floatingGroup = new THREE.Group();
    this.scene.add(this.floatingGroup);

    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x00f0ff, wireframe: true, roughness: 0.2, metalness: 0.8 }),
      new THREE.MeshStandardMaterial({ color: 0x8a2be2, wireframe: true, roughness: 0.2, metalness: 0.9 }),
      new THREE.MeshStandardMaterial({ color: 0x10b981, wireframe: true, roughness: 0.3, metalness: 0.7 })
    ];

    const geometries = [
      new THREE.IcosahedronGeometry(36, 1),
      new THREE.OctahedronGeometry(28, 0),
      new THREE.TorusGeometry(32, 8, 12, 28),
      new THREE.DodecahedronGeometry(26, 0)
    ];

    const count = window.innerWidth < 768 ? 4 : 7;
    for (let i = 0; i < count; i++) {
      const geo = geometries[i % geometries.length];
      const mat = materials[i % materials.length].clone();
      const mesh = new THREE.Mesh(geo, mat);

      const angle = (i / count) * Math.PI * 2;
      const radius = 320 + Math.random() * 120;
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.y = (Math.random() - 0.5) * 450;
      mesh.position.z = Math.sin(angle) * 220 - 50;

      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        rotSpeedZ: (Math.random() - 0.5) * 0.012,
        floatSpeed: 0.6 + Math.random() * 0.8,
        floatOffset: Math.random() * Math.PI * 2,
        baseY: mesh.position.y,
        baseX: mesh.position.x
      };

      this.floatingObjects.push(mesh);
      this.floatingGroup.add(mesh);
    }
  }

  private createDust(): void {
    const count = 350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1600;
      positions[i + 1] = (Math.random() - 0.5) * 1600;
      positions[i + 2] = (Math.random() - 0.5) * 900;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x64748b,
      size: 2,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    this.dust = new THREE.Points(geometry, material);
    this.scene.add(this.dust);
  }

  private bindEvents(): void {
    window.addEventListener('resize', this.resizeHandler, { passive: true });
    window.addEventListener('mousemove', this.mouseMoveHandler, { passive: true });
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  private onResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private onMouseMove(e: MouseEvent): void {
    this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  private onScroll(): void {
    this.targetScrollY = window.scrollY;
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const elapsedTime = this.clock.getElapsedTime();

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;
    this.scrollY += (this.targetScrollY - this.scrollY) * 0.06;

    this.camera.position.x = this.mouse.x * 90;
    this.camera.position.y = -this.mouse.y * 70 - (this.scrollY * 0.22);
    this.camera.lookAt(0, -this.scrollY * 0.22, 0);

    // Update Particles
    if (this.particles && this.linesMesh) {
      const positions = this.particles.geometry.attributes['position'].array as Float32Array;
      const pCount = this.particlesVelocities.length;
      const maxDist = 130;
      const linePos = this.linesMesh.geometry.attributes['position'].array as Float32Array;
      const lineCol = this.linesMesh.geometry.attributes['color'].array as Float32Array;

      let lineIndex = 0;
      let lineColIndex = 0;
      let connectedLines = 0;

      for (let i = 0; i < pCount; i++) {
        const i3 = i * 3;
        const v = this.particlesVelocities[i];

        positions[i3] += v.x;
        positions[i3 + 1] += v.y;
        positions[i3 + 2] += v.z;

        if (positions[i3] < -450 || positions[i3] > 450) v.x *= -1;
        if (positions[i3 + 1] < -350 || positions[i3 + 1] > 350) v.y *= -1;
        if (positions[i3 + 2] < -250 || positions[i3 + 2] > 250) v.z *= -1;

        for (let j = i + 1; j < pCount; j++) {
          const j3 = j * 3;
          const pDist = Math.sqrt(
            Math.pow(positions[i3] - positions[j3], 2) +
            Math.pow(positions[i3 + 1] - positions[j3 + 1], 2) +
            Math.pow(positions[i3 + 2] - positions[j3 + 2], 2)
          );

          if (pDist < maxDist) {
            const alpha = 1.0 - (pDist / maxDist);

            linePos[lineIndex++] = positions[i3];
            linePos[lineIndex++] = positions[i3 + 1];
            linePos[lineIndex++] = positions[i3 + 2];

            linePos[lineIndex++] = positions[j3];
            linePos[lineIndex++] = positions[j3 + 1];
            linePos[lineIndex++] = positions[j3 + 2];

            lineCol[lineColIndex++] = 0.0 * alpha;
            lineCol[lineColIndex++] = 0.94 * alpha;
            lineCol[lineColIndex++] = 1.0 * alpha;

            lineCol[lineColIndex++] = 0.54 * alpha;
            lineCol[lineColIndex++] = 0.17 * alpha;
            lineCol[lineColIndex++] = 0.88 * alpha;

            connectedLines++;
          }
        }
      }

      this.particles.geometry.attributes['position'].needsUpdate = true;
      this.linesMesh.geometry.setDrawRange(0, connectedLines * 2);
      this.linesMesh.geometry.attributes['position'].needsUpdate = true;
      this.linesMesh.geometry.attributes['color'].needsUpdate = true;
    }

    // Rotate floating objects
    this.floatingObjects.forEach((obj) => {
      const u = obj.userData;
      obj.rotation.x += u['rotSpeedX'];
      obj.rotation.y += u['rotSpeedY'];
      obj.rotation.z += u['rotSpeedZ'];

      obj.position.y = u['baseY'] + Math.sin(elapsedTime * u['floatSpeed'] + u['floatOffset']) * 25;
      obj.position.x = u['baseX'] + Math.cos(elapsedTime * 0.4 + u['floatOffset']) * 15;
    });

    if (this.floatingGroup) {
      this.floatingGroup.rotation.y = elapsedTime * 0.04 + (this.mouse.x * 0.15);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
