package fr.roboteek.demowebsocket.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import fr.roboteek.demowebsocket.dto.TemperatureMessageDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Random;

/**
 * Services "programmés" pour pousser des informations dans le Websocket.
 */
@Service
public class PushService {

    /** Template permmettant l'envoi de messages dans le Websocket. */
    private SimpMessagingTemplate simpMessagingTemplate;

    private int index;

    private final static Logger LOGGER = LoggerFactory.getLogger(PushService.class);

    public PushService(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    /**
     * Pousse un message de température (valeur + timestamp) dans le Websocket.
     */
    @Scheduled(fixedRate = 1000)
    public void pushTemperature() {
        float minTemp = 15F;
        float maxTemp = 25F;
        float temp = minTemp + new Random().nextFloat() * (maxTemp - minTemp);
        TemperatureMessageDto temperatureMessageDto = new TemperatureMessageDto(LocalDateTime.now(), temp);
        LOGGER.info("Temperature = {}", temperatureMessageDto);

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(LocalDateTime.class, new LocalDateTimeSerializer());
        Gson gson = gsonBuilder.setPrettyPrinting().create();
        simpMessagingTemplate.convertAndSend("/temperature",  gson.toJson(temperatureMessageDto));
    }

    /**
     * Pousse une image dans le Websocket.
     * @throws IOException exception I/O
     */
    @Scheduled(fixedRate = 100)
    public void pushImage() throws IOException {
        int idxImage = (index++) % 10;
        File file = ResourceUtils.getFile("classpath:images/frame_0" + idxImage + ".jpg");
        byte[] fileBytes = Files.readAllBytes(Path.of(file.getPath()));
        simpMessagingTemplate.convertAndSend("/image", Base64.getEncoder().encodeToString(fileBytes));
    }
}
