package com.genai.tts.service;

import org.springframework.ai.openai.OpenAiAudioSpeechModel;
import org.springframework.ai.openai.OpenAiAudioSpeechOptions;
import org.springframework.ai.openai.api.OpenAiAudioApi;
import org.springframework.ai.openai.api.OpenAiAudioApi.SpeechRequest;
import org.springframework.ai.openai.audio.speech.SpeechPrompt;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class TtsService {

    private final OpenAiAudioSpeechModel audioSpeechModel;

    public TtsService(OpenAiAudioSpeechModel audioSpeechModel) {
        this.audioSpeechModel = audioSpeechModel;
    }

    public ResponseEntity<Resource> textToSpeech(String inputPrompt) throws FileNotFoundException {
        OpenAiAudioSpeechOptions options = OpenAiAudioSpeechOptions
                .builder()
                .model(OpenAiAudioApi.TtsModel.TTS_1_HD.getValue())
                .responseFormat(OpenAiAudioApi.SpeechRequest.AudioResponseFormat.MP3)
                .voice(OpenAiAudioApi.SpeechRequest.Voice.ONYX.getValue())
                .speed(1.0f)
                .build();
        SpeechPrompt prompt = new SpeechPrompt(inputPrompt, options);
        byte[] speechOutputByteArray = audioSpeechModel.call(prompt)
                .getResult()
                .getOutput();

        // Save to server-side location
        String filePath = "C:/Users/avik/Codes/Projects/tts/output.mp3";
        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            fos.write(speechOutputByteArray);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        ByteArrayResource byteArrayResource = new ByteArrayResource(speechOutputByteArray);
        return ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(byteArrayResource.contentLength())
                .header("Content-Disposition",
                        ContentDisposition.attachment()
                                .filename("output.mp3")
                                .build()
                                .toString())
                .body(byteArrayResource);
    }
}
