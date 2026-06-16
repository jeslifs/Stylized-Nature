uniform vec3 uCloudColor;
uniform vec3 uCloudShadow;
uniform float uSoft;
uniform sampler2D uPerlinTexture;
uniform float uTime;

varying float vNoise;

void main()
{
    vec2 noiseUv = uv;
    noiseUv.x += uTime * 0.0001;

    // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // perlin
    float noise = texture2D(uPerlinTexture, noiseUv).r;
    noise = smoothstep(uSoft, 1.0, noise);
    float strength = 0.5;

    csm_Position = position + normal * noise * strength;
    // vec4 viewPosition = viewMatrix * modelPosition;
    // vec4 projectionPosition = projectionMatrix * viewPosition;

    // gl_Position = projectionPosition;

    vNoise = noise;
}