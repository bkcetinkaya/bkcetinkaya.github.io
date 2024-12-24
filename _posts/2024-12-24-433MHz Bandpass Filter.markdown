---
layout: post
title:  "433 Mhz Bandpass Filter"
date:   2024-11-13 19:15:56 +0100
categories: My Personal Engineering Projects
---

In the laboratory of my University, I was building a project where I needed to capture 433Mhz signals and measure the amplitude of the signals, But there was a small problem, 
the antenna that I was using, was picking up significant noise in the 1.3GHz range, which were affecting the overall amplitude of the received signal. 

How to solve this? Of course with a bandpass filter!

I designed the circuit using inductors and capacitors, created the schematic and also desinged the PCB as below:

![The schematic](/assets/Bandpass Schematic.png)

![The PCB](/assets/Bandpass Pcb.png)

Even though soldering these incredibly small smd parts were too difficult, I have managed to solder them properly.


![The pcb looks like this now with sma connectors on both ends](/assets/Bandpass Image.jpeg)