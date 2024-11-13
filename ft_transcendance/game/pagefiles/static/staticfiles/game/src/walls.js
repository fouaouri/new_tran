import { CapsuleGeometry, Mesh, MeshBasicMaterial} from 'three';

const GEOMETRY = new CapsuleGeometry(0.25, 30, 20, 20);
const MATERIAL = new MeshBasicMaterial();
GEOMETRY.rotateZ(Math.PI * 0.5);

export default class Walls{

    constructor(scene, position){
        this.scene = scene;
        this.Geometry = GEOMETRY;
        this.Material = MATERIAL;
        this.mesh = new Mesh(GEOMETRY,MATERIAL);

        this.mesh.position.copy(position);
        this.scene.add(this.mesh);

    }

}