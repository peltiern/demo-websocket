package fr.roboteek.demowebsocket.dto;

import java.time.LocalDateTime;

/**
 * Message pour l'envoi de la température.
 */
public class TemperatureMessageDto {

    private LocalDateTime time;

    private float temperature;

    public TemperatureMessageDto(LocalDateTime time, float temperature) {
        this.time = time;
        this.temperature = temperature;
    }

    @Override
    public String toString() {
        return "TemperatureMessageDto{" +
                "time=" + time +
                ", value=" + temperature +
                '}';
    }
}
