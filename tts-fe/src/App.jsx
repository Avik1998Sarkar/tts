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
            <div className='container mx-auto p-4 border rounded shadow-lg mt-10'>
                <h1 className="text-2xl font-bold mb-4">Text To Speech</h1>
                <textarea
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Enter text"
                    className='w-full p-2 border rounded mb-2'
                    rows="4"
                ></textarea>
                <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={handleGenerateSpeech} disabled={loading || !text}>
                    {loading ? 'Generating...' : 'Generate Speech'}
                </button>
                {audioUrl && (
                    <audio controls src={audioUrl} className='mt-2 w-full'>
                        Your browser does not support the audio element.
                    </audio>
                )}
            </div>
        </>
    )
}

export default App
