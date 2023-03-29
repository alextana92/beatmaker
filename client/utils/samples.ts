import * as Tone from 'tone'

function initSample (url: string) {
    // do not run on the server
    if (!process.client) return

    return new Tone.Player(url).toDestination()
}

const samples = {
    K: {
        name: 'Kick Drum',
        sample: initSample('/samples/kick.mp3'),
    },
    S: {
        name: 'Snare Drum',
        sample: initSample('/samples/snare.mp3'),
    },
    C: {
        name: 'Crash Cymbal',
        sample: initSample('/samples/crash.mp3'),
    },
    R: {
        name: 'Ride Cymbal',
        sample: initSample('/samples/ride.mp3'),
    },
    HH: {
        name: 'Hi Hat Cymbal',
        sample: initSample('/samples/hi-hat.mp3'),
    },
    T1: {
        name: 'High Tom',
        sample: initSample('/samples/tom1.mp3'),
    },
    T2: {
        name: 'Mid Tom',
        sample: initSample('/samples/tom2.mp3'),
    },
}

export default {
    K: samples['K'],
    S: samples['S'],
    C: samples['C'],
    HH: samples['HH'],
    T1: samples['T1'],
    T2: samples['T2'],
    R: samples['R'],
}