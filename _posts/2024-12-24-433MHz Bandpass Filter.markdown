---
layout: post
title:  "433 Mhz Bandpass Filter"
date:   2024-12-24 19:15:56 +0100
categories: My Personal Engineering Projects
---

In the laboratory of my University, I was building a project where I needed to capture 433Mhz signals and measure the amplitude of the signals, But there was a small problem, 
the antenna that I was using, was picking up significant noise in the 1.3GHz range, which were affecting the overall amplitude of the received signal. 

How to solve this? Of course with a bandpass filter!

I designed the circuit using inductors and capacitors, created the schematic and also desinged the PCB as below:

The Schematic:

{% image "Bandpass Schematic.png" width=600 height=600 %}

The PCB Design:

{% image "Bandpass Pcb.png" height=600 width=600 %}


Even though soldering these incredibly small smd parts were too difficult, I have managed to solder them properly.

The pcb looks like this now with sma connectors on both ends:

{% image "Bandpass Image.jpeg" height=600 width=600 %}