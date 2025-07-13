package com.genai.tts.controller;

import com.genai.tts.service.TtsService;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;

@RestController
@RequestMapping("/api/tts")
@CrossOrigin(origins = "http://localhost:5173/")
public class TtsController {

    private final TtsService ttsService;

    public TtsController(TtsService ttsService) {
        this.ttsService = ttsService;
    }

    @GetMapping(produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<Resource> generateSpeech(@RequestParam String text) throws FileNotFoundException {
        return ttsService.textToSpeech(text);
    }
}
