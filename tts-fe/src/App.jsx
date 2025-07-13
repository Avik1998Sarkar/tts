import { useState } from 'react'
import './App.css'

function App() {
    const [text, setText] = useState('')
    const [audioUrl, setAudioUrl] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleGenerateSpeech = async () => {
        setLoading(true)
        setAudioUrl(null)
        try {
            const response = await fetch(
                `http://localhost:8080/api/tts?text=${encodeURIComponent(text)}`
            )
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            setAudioUrl(url)
        } catch (err) {
            alert('Error generating speech')
        }
        setLoading(false)
    }

    return (
        <>
            <title>Text To Speech</title>
            <h1>Text To Speech</h1>
            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Enter text"
            />
            <button onClick={handleGenerateSpeech} disabled={loading || !text}>
                {loading ? 'Generating...' : 'Generate Speech'}
            </button>
            {audioUrl && (
                <audio controls src={audioUrl}>
                    Your browser does not support the audio element.
                </audio>
            )}
        </>
    )
}

export default App
