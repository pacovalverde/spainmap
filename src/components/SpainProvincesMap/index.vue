<template>
    <div :id="id" class="svg-container"></div>
</template>

<script setup>
    import { onMounted, reactive } from 'vue';
    import provinces from '../../data/spain-provinces.json';
    import generadoresEspana from '../../data/generadores_espana.json';
    import generadoresPortugal from '../../data/generadores_portugal.json';
    import svg from 'svg.js';

    const props = defineProps({
        id: {
            type: String,
            default: 'spain-map'
        }
    });

    const emit = defineEmits([
        'mapClick'
    ]);

    const generadores = [...generadoresEspana.generators, ...generadoresPortugal.generators];

    function geoToSVG(lat, lon) {
        // Debes implementar esta conversión según la escala del mapa SVG usado
        return {
            x: (lon + 17) * 50,
            y: (45 - lat) * 50
        };
    };

    // Datos reactivos
    const mapAttr = reactive({
        viewBoxWidth: 1000,
        viewBoxHeight: 891
    })

    // Método: crear un path
    function generatePath(svgCont, pathObj) {
        const attrs = {
            fill: 'transparent',
            stroke: '#28586c',
            'stroke-width': 1,
            title: pathObj['@name'],
            'map-id': pathObj['@id']
        }

        const province = svgCont.path(pathObj['@d']).attr(attrs)

        province.click((e) => {
            const mapId = e.target.attributes['map-id'].value
            const title = e.target.attributes.title.value
            emit('mapClick', { mapId, title })
        })
    }

    function generateMap() {
        const svgContainer = svg(props.id)
            .size('100%', '100%')
            .viewbox(0, 0, 1000, 891);

        provinces.forEach((pathObj) => {
            generatePath(svgContainer, pathObj)
        })

        // Añadir generadores como marcadores
        generadores.forEach(gen => {
            const coords = geoToSVG(gen.coordinates.lat, gen.coordinates.lon);
            svgContainer.circle(4).attr({
                            fill: 'red',
                            cx: coords.x,
                            cy: coords.y,
                            title: `${gen.name} (${gen.capacity_MW} MW)`
                        }).click(() => {
                            emit('mapClick', gen);
                        });
        });
    }

    onMounted(() => {
        generateMap();
    });
</script>

<style lang="scss">
.svg-container {
    width: 100%;
    position: relative;

    path {
        cursor: pointer;
        fill: rgba(#b2d676, 0.5);
        transition: all 0.2s ease-in-out;

        &:hover {
            fill: #004262;
        }
    }
}
</style>