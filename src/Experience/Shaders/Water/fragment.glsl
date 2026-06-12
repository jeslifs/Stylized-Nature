varying float vWater;
varying vec3 vWaterColor;

// varying float vWaterLayer2;

void main()
{
    if(vWater < 0.1)
    {
        discard;
    }

    csm_DiffuseColor = vec4(vWaterColor, vWater); 
}