uniform sampler2D uPerlinTexture;
uniform float uTime;
uniform vec2 uWindDirection;
uniform float uWindSpeed1;
uniform float uWindSpeed2;
uniform float uWindNoiseScale1;
uniform float uWindNoiseScale2;
uniform float uWindStrength;


vec2 getWind(vec2 worldXZ)
{
    // noise layer 1
    vec2 noiseUv1 =
        (worldXZ * uWindNoiseScale1) +
        (uWindDirection * (uTime * 0.001 * uWindSpeed1));

    float noise1 = texture(uPerlinTexture, noiseUv1).r - 0.5;

    // noise layer 2
    vec2 noiseUv2 =
        (worldXZ * uWindNoiseScale2) +
        (uWindDirection * (uTime * 0.0001 * uWindSpeed2));

    float noise2 = texture(uPerlinTexture, noiseUv2).g;


    float wind = noise1 * noise2;
        
    // direction
    vec2 windDirection =
        uWindDirection *
        wind *
        uWindStrength;

    return windDirection;
}