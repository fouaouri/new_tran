import { RingGeometry, Mesh, MeshBasicMaterial} from 'three';

const GEOMETRY = new RingGeometry(3.7, 4, 100);
const MATERIAL = new MeshBasicMaterial();
GEOMETRY.rotateX(-Math.PI * 0.5);

export default class Ring{

    constructor(scene, position){
        this.scene = scene;
        this.Geometry = GEOMETRY;
        this.Material = MATERIAL;
        this.mesh = new Mesh(GEOMETRY,MATERIAL);

        this.mesh.position.copy(position);
        this.scene.add(this.mesh);

    }

}