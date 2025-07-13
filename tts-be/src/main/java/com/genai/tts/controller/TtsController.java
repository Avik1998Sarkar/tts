package com.genai.tts.controller;

import com.genai.tts.service.TtsService;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;

@RestController
@RequestMapping("/api/tts")
public class TtsController {

    private final TtsService ttsService;

    public TtsController(TtsService ttsService) {
        this.ttsService = ttsService;
    }

    public void generateSpeech(@RequestParam String userPrompt) throws FileNotFoundException {
        ttsService.textToSpeech(userPrompt);
    }
}
