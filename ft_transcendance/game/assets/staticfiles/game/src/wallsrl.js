import { CapsuleGeometry, Mesh, MeshBasicMaterial} from 'three';

const GEOMETRY = new CapsuleGeometry(0.25, 40, 20, 20);
const MATERIAL = new MeshBasicMaterial();
GEOMETRY.rotateX(Math.PI * 0.5);

export default class Wallsrl{

    constructor(scene, position){
        this.scene = scene;
        this.Geometry = GEOMETRY;
        this.Material = MATERIAL;
        this.mesh = new Mesh(GEOMETRY,MATERIAL);

        this.mesh.position.copy(position);
        this.scene.add(this.mesh);

    }

}