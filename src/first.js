import * as THREE from 'three'
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'


//Debug UI
const gui = new GUI({
    width:300,
    closeFolders:true
})

gui.title ( 'Configurable Cube')

const folder = gui.addFolder('Cube')
const folder1 = gui.addFolder('Settings')



//Canvas
const canvas = document.querySelector('canvas.rajkumar')

//Scene
const scene = new THREE.Scene()

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    wireframe: false
})

//Objects - Mesh
var box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)


//Range

folder.add(box.position, 'y')
    .min(0)
    .max(5)
    .step(1)
    .name('Height')

folder.add(box.rotation, 'y')
    .min(0)
    .max(Math.PI * 2)
    .step(Math.PI / 4)
    .name('Rotation')

folder.add(box, 'visible')

folder.add(material, 'wireframe')

folder.addColor(material, 'color').name('Box Color')
    .onChange((value) => {
        console.log('Color has changed ' + value.getHexString())
        material.color.set(value.getHexString())
    })

// my object

const myObject = {
    scale: 1
}

myObject.func = () => {
    gsap.to(box.rotation, {
        duration: 1,
        y: box.rotation.y + Math.PI / 4
    })

    gui.hide()
}


folder.add(myObject, 'func')

folder.add(myObject, 'scale').min(1)
    .max(4)
    .onChange((value) => {


    })
    .onFinishChange(() => {

        box.scale.x = myObject.scale
        box.scale.y = myObject.scale
        box.scale.z = myObject.scale

    })

const helper = new THREE.AxesHelper(1, 1, 1)

scene.add(helper, box)

var sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Camera
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height)
scene.add(camera)
camera.position.z = 5

const controls = new OrbitControls(camera, canvas)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

var clock = new THREE.Clock()
controls.enableZoom = true


//Handle Events
window.addEventListener('resize', () => {

    //sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {

    // const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    // if (!fullscreenElement) {
    //     if (canvas.requestFullscreen) {
    //         // go to full screen
    //         canvas.requestFullscreen()
    //     } else if (canvas.webkitRequestFullscreen) {
    //         canvas.webkitRequestFullscreen()
    //     }
    // } else {
    //     //leave full screen
    //     if (document.exitFullscreen) {
    //         document.exitFullscreen()
    //     } else if (document.webkitExitFullscreen) {
    //         document.webkitExitFullscreen()
    //     }
    // }

    gui.show(true)
})



function animate() {
    const elaspedTime = clock.getElapsedTime()
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()