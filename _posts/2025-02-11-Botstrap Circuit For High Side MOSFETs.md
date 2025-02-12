---
layout: post
title:  "Botstrap Circuit For High Side MOSFETs"
date:   2025-02-10 21:27:56 +0100
categories: Engineering Projects
---


Turning high side MOSFETs on and off (assuming you use an n-channel MOSFET to achieve fast switching due to their low RDS(on)) require bootstrap circuit to boost the gate voltage higher than the source voltage. We achieve this by utilizing a boostrap capacitor, diode and a BJT transistor.


## Schematic and the Working Principle:


# Inital Off State:


![GPIO](/assets/bootstrap.gif){: width="500" }


In the inital state, the BJT is turned on. The gate of the high side MOSFET is at 0V. Bootstrap capacitor charges to VCC through the diode.
The load is connected to ground through the low-side MOSFET, so the source of the high-side MOSFET is at ground potential.

# On State:

Now the BJT is turned off, meaning we assume it is an open circuit. 