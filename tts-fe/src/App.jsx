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
            <div className="mx-auto mt-10 p-4 border rounded shadow-lg max-w-7xl w-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
                <h1 className="text-2xl font-bold mb-4 text-white">Text To Speech</h1>
                <textarea
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Enter text"
                    className="w-full p-2 border rounded mb-2 bg-gray-800 text-white placeholder-gray-400"
                    rows="4"
                ></textarea>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleGenerateSpeech} disabled={loading || !text}>
                    {loading ? 'Generating...' : 'Generate Speech'}
                </button>
            </div>
            {audioUrl && (
                <div className="mt-4 w-full flex flex-col items-center">
                    <audio
                        controls
                        src={audioUrl}
                        className="w-full rounded-lg shadow bg-gray-800"
                    >
                        Your browser does not support the audio element.
                    </audio>
                    <a
                        href={audioUrl}
                        download="tts-output.mp3"
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
                    >
                        Download MP3
                    </a>
                </div>
            )}
        </>
    )
}

export default App
