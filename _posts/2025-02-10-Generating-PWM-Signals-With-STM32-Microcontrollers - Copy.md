---
layout: post
title:  "Generating PWM Signals With STM32 Microcontrollers"
date:   2025-02-10 19:56:56 +0100
categories: Engineering Projects
---

Generating PWM signals with STM32 microcontrollers is straightforward. Just follow the instructions below:


## Select an appropriate GPIO pin:


I chose the GPIO pin PA6 and set it to TIM_CH1, meaning Timer 3 and channel 1.

![GPIO](/assets/pin selection.png){: width="500" }


## Activate the timer channel and configure settings:

After activating the timer channel you set the pin to, configure the timer source to "Internal Clock" (Unless you want to use an external clock.) then set the Channel1 to "PWM Generation CH1"

![TIMER3](/assets/select timer channel.png){: width="500" }


## Set Timer Parameters:


Use the following formula to get your desired PWM frequency : 

- Your clock frequency / ( (prescaler + 1) x (ARR + 1) ) 
- Duty cycle is: (Pulse / ARR) x 100


![TIM](/assets/timer configuration.png){: width="500" }



## Example:

My clock source is running at 72MHz, I set the values so I get 80 percent and 50 percent duty cycles. These are the results on my oscilloscope:


![TIM](/assets/50duty.jpeg){: width="500" }


![TIM](/assets/80duty.jpeg){: width="500" }


