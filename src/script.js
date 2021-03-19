import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { WebGLMultisampleRenderTarget } from 'three'

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/NormalMap4.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.SphereBufferGeometry( .5, 64, 64);
const geometry = new THREE.SphereGeometry( .5, 64, 64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = .7
material.roughness = .2
material.normalMap = normalTexture
material.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Light 2

const pointLight2 = new THREE.PointLight(0x1840c5, 2)
pointLight2.position.set(-1.13, -3, -1.06)
pointLight2.intensity = 10

scene.add(pointLight2)

const light2 = gui.addFolder('Light 2')

light2.add(pointLight2.position, 'x').min(-7).max(7).step(.01)
// light2.add(pointLight2.position, 'y').min(-7).max(7).step(.01)
light2.add(pointLight2.position, 'z').min(-7).max(7).step(.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(.01)

const light2Color = {
    color: 0xff0000
}

light2.addColor(light2Color, 'color')
    .onChange(() => pointLight2.color.set(light2Color.color))

const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper2)


// Light 3

const pointLight3 = new THREE.PointLight(0xd925d9, 2)
pointLight3.position.set(2, 1.71, -2.31)
pointLight3.intensity = 1.48

scene.add(pointLight3)

const light3 = gui.addFolder('Light 3')

light3.add(pointLight3.position, 'x').min(-7).max(7).step(.01)
// light3.add(pointLight3.position, 'y').min(-7).max(7).step(.01)
light3.add(pointLight3.position, 'z').min(-7).max(7).step(.01)
light3.add(pointLight3, 'intensity').min(0).max(10).step(.01)

const light3Color = {
    color: 0xff0000
}

const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper3)

light3.addColor(light3Color, 'color')
    .onChange(() => pointLight3.color.set(light3Color.color))


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2

const onDocumentMouseMove = event => {
    mouseX = event.clientX - windowHalfX
    mouseY = event.clientY - windowHalfY
}

document.addEventListener('mousemove', onDocumentMouseMove)


let maxPositionY = pointLight2.position.y * 2
let minPositionY = pointLight2.position.y * .5

const updateElements = event => {
    sphere.position.y = window.scrollY * .0015
    pointLight2.position.y = window.scrollY * .01 - 3
    pointLight3.position.y = ((window.scrollY * .01) * -1) + 1.7
}

window.addEventListener('scroll', updateElements)


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()