uniform float uProgress;
varying vec2 vUv;

void main()
{
    float boundary = uProgress;
    
    if(vUv.y < boundary)
        discard;
    
    gl_FragColor = vec4(0.08, 0.08, 0.1, 1.0 - boundary);
}