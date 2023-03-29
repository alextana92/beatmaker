<template>
    <div class="grid place-content-center text-center h-[70vh]">
        <h1 class="text-6xl font-extrabold mb-2 tracking-tighter text-gray-700">Generate drums</h1>
        <UiButton :loading="loading" @click="handleGenerate" class="my-2">
            {{ arrToUse.length ? 'Generate again' : 'Generate fill' }}
        </UiButton>
        <div class="grid grid-cols-2 gap-3">
            <UiButton @click="handlePlay" class="my-2">Play</UiButton>
            <UiButton @click="handleStop" :disabled="!isPlaying" class="my-2">Stop</UiButton>
        </div>
        <div class="checkbox-toggle-ai">
            <input class="mr-2" type="checkbox" id="checkbox" v-model="useAi" />
            <label for="checkbox">Use AI</label>
        </div>

        {{ arrToUse }}
    </div>
</template>

<script setup>
import * as Tone from 'tone'
import d from '../client/utils/samples'

const loading = ref(false)
const useAi = ref(false)
const isPlaying = ref(false)
const arrToUse = ref([])

/* NICE ->
    [ [ "HH", "T1", "T1", "HH", "S", "T2", "T2", "HH" ],
    [ "K", "K", "S", "T1", "T1", "S", "T2", "T2" ],
    [ "HH", "T1", "T1", "HH", "S", "T2", "T2", "HH" ],
    [ "K", "K", "S", "T1", "T1", "S", "T2", "T2" ] ]
*/

let sequence = null

async function handleGenerate() {
    loading.value = true

    if (!useAi.value) {
        // something
    } else {
        const { data: arr } = await useLazyFetch('/api/generateBeat')

        const aiDataPre = await arr.value.res.content.split('--begin--\n')[1]
        const aiData = aiDataPre.split('--end--')[0]

        arrToUse.value = JSON.parse(aiData).fill
    }

    loading.value = false
}

async function handlePlay() {
    await Tone.start()

    sequence = new Tone.Sequence((time, note) => {
        const sample = d[note]?.sample
        console.log(note, d[note])
        sample.start(time)
        // sample.volume.value = d[note].volume

    }, arrToUse.value, '4n')

    Tone.Transport.bpm.value = 80
    Tone.Transport.start()
    sequence.start()
    isPlaying.value = true
}

function handleStop() {
    Tone.Transport.stop()
    sequence.stop()
    isPlaying.value = false
}

</script>