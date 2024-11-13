import { Material, Mesh, MeshBasicMaterial, SphereGeometry } from 'three';

export default class Ball{
    constructor(scene, color = 0x00000000){
        this.scene = scene;
        this.Geometry = new SphereGeometry(0.50);
        this.Material = new MeshBasicMaterial();
        this.mesh = new Mesh(this.Geometry, this.Material);

        this.scene.add(this.mesh);

    }


}
// constructor(scene, color = 0xffffff)
// const ballplayG = new THREE.CircleGeometry(0.1, 20, 32);
// const ballplayM = new THREE.MeshBasicMaterial({color: 0xffd700});

// const ballplay = new THREE.Mesh(ballplayG, ballplayM);
// scene.add(ballplay);