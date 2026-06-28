export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    },
    // {
    //     name: 'foxModel',
    //     type: 'gltfModel',
    //     path: 'models/Fox/glTF/Fox.gltf'
    // },
    {
        name: 'GroundModel',
        type: 'gltfModel',
        path: 'models/Sheep/Ground.glb'
    },
    
    {
        name: 'sheepModel',
        type: 'gltfModel',
        path: 'models/Sheep/Sheep.glb'
    },
    {
        name: 'perlinTexture',
        type: 'texture',
        path: 'textures/noise/perlin.png'
    },
    {
        name: 'terrainTexture',
        type: 'texture',
        path: 'textures/palette/terrain.png'
    },
]