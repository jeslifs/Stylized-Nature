uniform sampler2D uTerrain;
uniform vec3 uDeepColor;
uniform vec3 uShallowColor;
uniform float uWind;
uniform sampler2D uPerlinTexture;
uniform float uSize;

varying float vWater;
varying vec3 vWaterColor;
// varying float vWaterLayer2;


uniform float uTime;
uniform vec2 uWindDirection;
uniform float uWindSpeed1;
uniform float uWindSpeed2;
uniform float uWindNoiseScale1;
uniform float uWindNoiseScale2;
uniform float uWindStrength;


void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // water plane uv
    vec2 waterUv = (modelPosition.xz / uSize) + 0.5;

    // water area
    float waterArea = texture(uTerrain, waterUv).r;
    
    // get wind direction
    // noise layer 1
    vec2 noiseUv1 =
        (modelPosition.xz * uWindNoiseScale1) +
        (uWindDirection * (uTime * 0.001 * uWindSpeed1));

    float noise1 = texture(uPerlinTexture, noiseUv1).r;

    // noise layer 2
    vec2 noiseUv2 =
        (modelPosition.xz * uWindNoiseScale2) +
        (uWindDirection * (uTime * 0.0001 * uWindSpeed2));

    float noise2 = texture(uPerlinTexture, noiseUv2).g;


    float wind = noise1 * noise2;
        
    // direction
    vec2 windDirection =
        uWindDirection *
        wind *
        uWindStrength;

    // water layer 1
    float waterLayer1 = texture(uPerlinTexture, waterUv).r * 25.5 * windDirection.x;

    // water layer 2
    float waterLayer2 = texture(uPerlinTexture, waterUv).g * windDirection.y;



    vec3 finalColor = mix(uShallowColor, uDeepColor, waterLayer1 * waterLayer2);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    csm_Position.x = modelPosition.x;

    vWater = waterArea;
    vWaterColor = finalColor;
    // vWaterLayer2 = waterLayer2;
}