<template>
    <div :id="id" class="svg-container"></div>
</template>

<script setup>
    import { onMounted, reactive } from 'vue';
    import provinces from '../../data/spain-provinces.json';
    import svg from 'svg.js'

    // Props
    const props = defineProps({
        id: {
            type: String,
            default: 'spain-map'
        }
    })

    // Emit
    const emit = defineEmits(['mapClick'])

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

    // Método: generar el mapa
    function generateMap() {
        const svgContainer = svg(props.id)
            .size('100%', '100%')
            .viewbox(0, 0, mapAttr.viewBoxWidth, mapAttr.viewBoxHeight)

        provinces.forEach((pathObj) => {
            generatePath(svgContainer, pathObj)
        })
    }

    // Lifecycle
    onMounted(() => {
        generateMap()
    })
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
