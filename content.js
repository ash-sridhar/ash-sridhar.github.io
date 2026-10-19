/*
  EDIT THIS FILE TO UPDATE YOUR SITE.
  To add a project, duplicate one object inside `projects`, assign a unique id,
  change its text, and point `image` to an SVG / PNG / JPG under .
  No HTML or CSS changes required.
*/
window.PORTFOLIO = {
  person: {
    name: 'Ashwath Sridhar',
    shortName: 'Ash',
    role: 'Electrical Engineering Student',
    school: 'Georgia Institute of Technology',
    location: 'Los Angeles, California',
    graduation: 'December 2028',
    gpa: '4.0',
    email: 'ashwathsridhar7@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ashwath-sridhar1/',
    resume: 'Ashwath_Sridhar_Resume.pdf'
  },
  filters: [
    { id: 'all', label: 'All work' },
    { id: 'ic', label: 'IC design' },
    { id: 'embedded', label: 'PCB + embedded' },
    { id: 'testing', label: 'Test + automation' }
  ],
  projects: [
    {
      id: 'vco',
      number: '01',
      title: 'Ring VCO + Six-Stage Output Buffer',
      eyebrow: 'Analog / mixed-signal',
      category: 'ic',
      featured: true,
      image: 'vco-layout.webp',
      imageAlt: 'Cadence Virtuoso full-custom layout of the five-stage VCO and its six-stage output buffer',
      period: '2026 · SiliconJackets',
      tags: ['SKY130', 'Cadence Virtuoso', 'Analog IC', 'Layout'],
      metric: '451.2–549.6 MHz',
      metricLabel: 'tt corner, 0–70°C',
      teaser: 'Designed a current-starved ring VCO and six-stage tapered output buffer, then verified the full custom layout with clean DRC and LVS.',
      challenge: 'The project goal was to design a current-starved ring VCO that met a 450–550 MHz target while staying under the power constraint, and then make that signal usable at the system level through a six-stage output buffer that could drive a 1 pF load.',
      approach: 'I sized and simulated a five-stage oscillator, built a current-mirror bias network, and iterated on the bias point after seeing frequency drift during temperature sweeps. I then connected the oscillator to a tapered six-stage output buffer with progressively stronger inverters. On the layout side, I implemented both blocks in Cadence Virtuoso, working through fingered devices, routing, body ties, guard rings, and physical verification until the complete design was DRC-clean and LVS matched.',
      outcome: 'At the tt process corner, the design covered 451.2–549.6 MHz over 0–70 °C and met the stated specification. The review also showed a 51.01–51.66% duty cycle, 202.2–205.7 ps rise time, and 37.6–47.5 µW of ring-only power. Separate process-corner checks at 27 °C measured about 704.8 MHz at ff and 314.9 MHz at ss. The combined VCO and output-buffer layout passed DRC with zero violations and achieved a clean LVS match.',
      takeaway: 'This project showed me that analog design does not stop at the schematic. Device sizing, biasing, simulation, physical layout, and verification all affect the final behavior, and the buffer is just as important as the oscillator when you want a usable output.',
      gallery: [
        { image: 'vco-layout.webp', alt: 'The full custom VCO and tapered-buffer layout in Cadence Virtuoso', caption: 'Full-custom layout: VCO at left, six-stage buffer at right' },
        { image: 'vco-schematics.webp', alt: 'Current-starved oscillator and buffer schematics', caption: 'Five-stage ring, six-stage buffer, and testbench schematics' },
        { image: 'vco-temp-graph.webp', alt: 'Cadence temperature sweep graph from 451.2 to 549.6 MHz', caption: 'Simulated frequency over 0–70 °C at the tt corner' },
        { image: 'vco-waveforms.webp', alt: 'Transient waveforms across three process corners and measured specifications', caption: 'Transient and verification results from the design review' },
        { image: 'vco-drc.webp', alt: 'Pegasus DRC report with zero violations', caption: 'Physical verification: zero DRC violations' },
        { image: 'vco-lvs.webp', alt: 'Layout versus schematic report showing a match', caption: 'LVS: extracted layout matches the schematic' }
      ],
      specs: [
        ['Oscillation / 0–70 °C, tt', '451.2–549.6 MHz'],
        ['Duty cycle', '51.01–51.66%'],
        ['Rise time', '202.2–205.7 ps'],
        ['Ring power', '37.6–47.5 µW'],
        ['Top-level DRC / LVS', '0 violations / Match']
      ],
      resource: { url: 'Ring_Oscillator_Final.pdf', label: 'View original VCO design-review slides (PDF)' }
    },
    {
      id: 'switching',
      number: '02',
      title: 'Switching & Signal Validation',
      eyebrow: 'Circuit design / debug',
      category: 'testing',
      featured: true,
      image: 'switching-clean.png',
      imageAlt: 'Switching network diagram used as a project visual',
      period: 'Summer 2026 · huMannity Medtec',
      tags: ['H-Bridge', 'Oscilloscope', 'Circuit Debugging', 'Validation'],
      metric: '>98%',
      metricLabel: 'timing accuracy',
      teaser: 'Traced unexpected pulse behavior to a schematic error, corrected the design, and verified greater than 98% timing accuracy with oscilloscope measurements.',
      challenge: 'During my medical-device engineering internship, I helped validate a switching circuit responsible for producing pulses with the intended timing and polarity. Part of the measured waveform did not agree with what the schematic predicted. The key challenge was to distinguish a real circuit problem from a test setup or measurement error, identify its cause, and establish a repeatable way to verify the correction.',
      approach: 'I measured the switching waveforms on an oscilloscope and compared their timing and polarity against the expected behavior at specific points in the circuit. When the signals diverged, I checked the instrument setup and traced the switching path back through the schematic rather than assuming a faulty component. That systematic comparison exposed an error in the schematic. After the design was corrected, I repeated the validation procedure and characterized fast current transients. The associated 126-point, 18-configuration characterization procedure also motivated a separate Python oscilloscope automation project, documented in the next case study.',
      outcome: 'After the schematic correction, the switching circuit achieved greater than 98% timing accuracy. I also characterized current spikes on timescales down to approximately 40 ns. The result provided evidence that the corrected switching behavior matched the design intent and that the validation method could capture short transients rather than overlooking them.',
      takeaway: 'This work taught me to use measurements to eliminate possibilities instead of changing things randomly. A waveform mismatch is a clue: understanding the expected circuit behavior, measurement setup, and signal path is what turns that clue into a verified design improvement.'
    },
    {
      id: 'mcu',
      number: '03',
      title: 'MCU Firmware for PMIC Validation',
      eyebrow: 'Embedded firmware / validation',
      category: 'embedded',
      featured: false,
      image: 'mcu.svg',
      imageAlt: 'Concept illustration of microcontroller firmware validating communication with a power management IC',
      period: 'Summer 2026 · huMannity Medtec',
      tags: ['Simplicity Studio', 'C', 'I²C', 'Validation'],
      metric: '99.75%',
      metricLabel: 'measurement accuracy',
      teaser: 'Programmed embedded MCU firmware to validate PMIC communication and measurement accuracy across a battery-voltage range.',
      challenge: 'To support a lower-power design, I needed to verify that a microcontroller could communicate reliably with a power management IC at 1.8 V logic while polling at 3 Hz and reporting accurate measurements across the expected battery range.',
      approach: 'I programmed embedded MCU firmware in Simplicity Studio IDE and used it to validate I²C communication with the PMIC. The test setup checked operation at 1.8 V logic with 3 Hz polling and compared reported measurements against expected values over a 3.5–4.2 V span.',
      outcome: 'The validation confirmed 99.75% measurement accuracy across 3,600 samples spanning the 3.5–4.2 V range. That result gave confidence that the lower-power design approach was still providing dependable PMIC communication and usable measurement quality.',
      takeaway: 'I like embedded work most when it directly supports hardware decisions. Firmware can be a practical way to verify whether an electrical design choice will hold up in a real system.'
    },
    {
      id: 'automation',
      number: '04',
      title: 'Oscilloscope Automation',
      eyebrow: 'Test engineering / Python',
      category: 'testing',
      featured: false,
      image: 'automation-purple.png',
      imageAlt: 'Conceptual purple oscilloscope and automation controller interface, not a screenshot of the deployed tool',
      period: 'Summer 2026 · huMannity Medtec',
      tags: ['Python', 'Oscilloscope', 'GUI', 'Hardware Test'],
      metric: '8 hr → <3 min',
      metricLabel: 'full characterization sweep',
      teaser: 'Built a Python-controlled measurement workflow that turned an eight-hour manual process into a repeatable automated sweep.',
      challenge: 'A characterization procedure involved 126 measurement points across 18 operating configurations. Executing and recording the sweep by hand took roughly eight hours, making repeated testing slow and vulnerable to manual inconsistencies.',
      approach: 'During my internship, I wrote a custom Python script and GUI to automate the oscilloscope characterization process. The workflow sequenced operating conditions, captured measurements, and reduced the repetitive manual steps that had previously required constant operator involvement.',
      outcome: 'The complete characterization sweep dropped from about eight hours to under three minutes. That freed engineering time for comparing revisions, troubleshooting hardware, and analyzing results rather than repeatedly driving the same instrument controls by hand.',
      takeaway: 'Automation is most useful when another engineer can trust it. I want the tools I build to be fast, but also clear enough that someone else can understand and reuse them.'
    },
    {
      id: 'ecg',
      number: '05',
      title: 'ECG Signal-Chain Debugging',
      eyebrow: 'Analog circuits / biomedical electronics',
      category: 'testing',
      featured: false,
      image: 'ecg-debugging.png',
      imageAlt: 'Conceptual illustration of a low-amplitude ECG input, op-amp gain stage, and rectangular output waveform; not a measured oscilloscope capture',
      period: 'Summer 2026 · huMannity Medtec',
      tags: ['ECG', 'Analog Front End', 'Amplifier Gain', 'Hardware Debugging'],
      metric: '0.5 mV',
      metricLabel: 'reliable detection threshold',
      teaser: 'Debugged an ECG acquisition signal chain that missed lower-amplitude R-waves and improved detection by optimizing amplifier gain.',
      challenge: 'During my medical-device internship, an ECG signal-acquisition board could detect larger cardiac signals but became unreliable when R-wave amplitudes dropped. I needed to determine whether the failure came from the source signal, the acquisition circuitry, or the gain configuration, without blindly replacing components or over-amplifying the input.',
      approach: 'I began with the expected ECG input and compared it to the board’s actual output, tracing the signal through the acquisition chain. That let me narrow the problem to the amplification stage instead of assuming a defective part. I determined that the existing amplifier gain was not appropriate for the lower-amplitude signals. I adjusted and tested the gain, checking that increased sensitivity did not make the resulting signal unusable.',
      outcome: 'After the gain adjustment, the acquisition system reliably detected ECG signals with amplitudes down to approximately 0.5 mV. This was a signal-chain configuration issue rather than simply a broken component, and the investigation provided a repeatable way to evaluate lower-amplitude detection.',
      takeaway: 'Analog debugging requires understanding the complete signal path. An operating point or gain structure can be wrong for the required input range even when every individual component appears to work.'
    },
    {
      id: 'pcb',
      number: '06',
      title: 'HyTech Flashing Keychain PCB',
      eyebrow: 'PCB design / prototyping',
      category: 'embedded',
      featured: true,
      image: 'keychain-3d-render.webp',
      imageAlt: 'My Altium 3D rendering of the HyTech logo-shaped keychain PCB',
      period: '2026 · HyTech Racing',
      tags: ['Altium Designer', 'LM555', 'PCB Layout', 'Soldering'],
      metric: '2 layers',
      metricLabel: 'hardware-verified PCB',
      teaser: 'Designed, routed, and validated a USB-C powered LED oscillator board, including custom component library work.',
      challenge: 'Develop a USB-C-powered keychain that adapts HyTech Racing’s Ready-to-Move light concept: a flashing indicator driven by an LM555 timer, with six 0603 LEDs arranged as part of the team logo. The exercise emphasized real electronics constraints and manufacturable layout.',
      approach: 'I created the LM555 schematic symbol and footprint using the part datasheet, designed the USB-C power and LED-output sections, and configured the timer in astable mode. With a 13 kΩ timing resistor, 100 kΩ timing resistor, and 2.2 µF capacitor, the ideal calculation predicts roughly 3.1 Hz with about a 53% high-time duty cycle. I laid out the custom logo-shaped two-layer board in Altium and verified the fabricated design through hardware testing.',
      outcome: 'The final PCB was DRC-clean and hardware-verified. The most useful part of the process was learning to connect datasheet details to the physical design decisions that determine whether a board can actually be assembled and operated.',
      takeaway: 'A schematic is only one representation of a product. Library accuracy, footprint orientation, connector details, manufacturing rules, and board-level validation are just as important as the circuit concept.',
      gallery: [
        { image: 'keychain-3d-render.webp', alt: 'My Altium 3D rendering of the keychain PCB', caption: '3D PCB model and custom HyTech-inspired board outline' },
        { image: 'keychain-timer-schematic.webp', alt: 'LM555 timer schematic with R1 100 kΩ, R2 13 kΩ and C2 2.2 µF', caption: 'LM555 astable oscillator schematic' },
        { image: 'keychain-usbc-led-schematic.webp', alt: 'USB-C input and six-LED output schematic', caption: 'USB-C power input and LED output circuitry' },
        { image: 'keychain-pcb-top.webp', alt: 'Top-layer routing of the keychain board in Altium', caption: 'Top copper routing and ground plane' },
        { image: 'keychain-pcb-bottom.webp', alt: 'Bottom-layer copper view in Altium', caption: 'Bottom copper routing and ground plane' }
      ]
    },
    {
      id: 'firmware',
      number: '07',
      title: 'Sensor Interface Firmware',
      eyebrow: 'Embedded systems',
      category: 'embedded',
      featured: false,
      image: 'firmware.svg',
      imageAlt: 'Original conceptual diagram of an Arduino and BME280 sensor with serial data paths',
      period: '2026 · HyTech Racing',
      tags: ['C++', 'Arduino', 'BME280', 'I²C / SPI'],
      metric: 'I²C + SPI',
      metricLabel: 'communication interfaces',
      teaser: 'Developed modular C++ firmware that reads a sensor and controls LEDs based on temperature.',
      challenge: 'Embedded systems require software that can communicate predictably with physical devices. The goal was to connect a BME280 environmental sensor to an Arduino Uno, handle interface communication, and use the temperature reading to control an LED output.',
      approach: 'I wrote modular C++ firmware with a hardware abstraction structure, implemented I²C and SPI communication paths, and connected sensor readings to temperature-dependent LED control. I also used GitHub continuous integration to verify builds, reinforcing the value of source control and automated checks even for relatively small hardware projects.',
      outcome: 'The project demonstrated an end-to-end embedded workflow, from peripheral communication to application logic and build verification. It gave me practice organizing firmware so low-level interactions and higher-level decisions remain understandable.',
      takeaway: 'I want to continue developing embedded skills that complement my circuit background. Understanding the electrical interface and the firmware using it helps me reason about the system as a whole.'
    }
  ],
  discovery: {
    title: 'HyTech Racing · Flashing Keychain PCB',
    status: 'Complete case study',
    summary: 'For my ECE 1100 Individual Discovery Project, I designed and validated a two-layer, USB-C-powered LED keychain based on HyTech Racing’s Ready-to-Move indicator. The project brought together datasheet research, 555 timer design, custom CAD libraries, schematic capture, PCB routing, and hardware verification.',
    image: 'keychain-3d-render.webp',
    imageAlt: '3D PCB rendering I created in Altium Designer for the HyTech Racing keychain project',
    sections: [
      {
        heading: '01 / The problem',
        body: 'I wanted my Discovery Project to be a real piece of electrical engineering work, not just a conceptual circuit. Through HyTech Racing, Georgia Tech’s electric Formula SAE team, I had an opportunity to design a small keychain board inspired by the Ready-to-Move (RTM) light used on the race car. That warning light communicates when the vehicle is in a state where it may move. The keychain adapts the blinking-light idea into a compact, USB-powered circuit with six surface-mount LEDs arranged as a visual part of the team logo. Success meant creating more than a schematic: I needed to research the required timing behavior, select components, make accurate library parts, route a two-layer board, and verify that the design worked on real hardware.'
      },
      {
        heading: '02 / Research and circuit design',
        body: 'I started by studying the HyTech training requirements and reading the LM555 timer datasheet. The circuit needed an astable operating mode, where the timer continuously switches between high and low outputs. The training module described a 2–5 Hz flashing range and used a 53% positive duty-cycle target for the keychain. Rather than copying an example circuit without understanding it, I worked through how the resistors and timing capacitor control the charge and discharge intervals. My schematic uses a 13 kΩ resistor, a 100 kΩ resistor, and a 2.2 µF timing capacitor. Using the ideal astable equations, those values give approximately 3.1 Hz and a 53% high-time duty cycle. These are calculated design values, not a claim of a measured oscillation frequency. I also researched how the USB-C connector receives 5 V power, including 5.1 kΩ configuration-channel pull-down resistors, and organized the schematic into the timer, power, and LED sections.'
      },
      {
        heading: '03 / CAD libraries and PCB layout',
        body: 'One of the most useful parts of this project was learning how much work happens before routing a single trace. In Altium Designer, I created a custom schematic symbol and footprint for the specific LM555 package using manufacturer dimensions and the team’s electrical style conventions. I had to think about pin numbering, pad placement, component orientation, and the relationship between a logical circuit symbol and the actual device that will be soldered to a board. After placing the USB-C connector, timer, passives, and six 0603 LEDs, I arranged them around the distinctive keychain shape. The board uses two copper layers and the layout screenshots show my signal routing, grounding, and component placement. Keeping the design compact while maintaining clear connections, correct footprints, and design-rule compliance made the project feel much closer to product engineering than a classroom-only circuit exercise.'
      },
      {
        heading: '04 / Validation and results',
        body: 'The deliverables include the completed timer schematic, USB-C and LED schematic, top and bottom PCB routing views, and a 3D board rendering. The finished design passed the design-rule checks and was verified with hardware testing, as documented in my project experience. The screenshots in this feature are from my own Altium work, rather than generic stock imagery or an imagined rendering of a finished product. The ideal 3.1 Hz timing result describes the component selection; I have not included a measured frequency trace because it was not part of the materials I saved for this feature. Presenting the design evidence clearly is just as important to me as the final technical result, because another engineer should be able to follow the path from the requirements to the routed PCB.'
      },
      {
        heading: '05 / Reflection and next steps',
        body: 'This project helped me connect several engineering skills I had previously treated as separate topics: reading datasheets, circuit analysis, selecting practical component values, building a reusable parts library, and navigating PCB layout and verification. I learned that a correct-looking circuit can still cause problems if a footprint is wrong, a connector pin is misunderstood, or the physical routing is overlooked. It also reinforced why I am interested in Circuit Technology and Electronic Devices: even a small blinking keychain depends on real timing behavior, device characteristics, and thoughtful physical implementation. For a future revision, I would capture oscilloscope waveforms of the assembled board and compare measured frequency and duty cycle with the design equations, then document any tolerance-related differences. I can apply the same design-to-test mindset to more complex team electronics throughout my time at Georgia Tech.'
      }
    ],
    gallery: [
      { image: 'keychain-3d-render.webp', alt: 'Altium 3D board rendering created for my keychain', caption: '3D design of the keychain PCB' },
      { image: 'keychain-timer-schematic.webp', alt: '555 timer schematic used in the keychain project', caption: 'LM555 oscillator with timing resistor/capacitor values' },
      { image: 'keychain-usbc-led-schematic.webp', alt: 'USB-C power and LED array schematic', caption: 'USB-C power and six 0603 LEDs' },
      { image: 'keychain-pcb-top.webp', alt: 'Routed top PCB layer designed in Altium', caption: 'Top-layer layout and traces' },
      { image: 'keychain-pcb-bottom.webp', alt: 'Routed bottom PCB layer designed in Altium', caption: 'Bottom-layer layout and copper fills' }
    ]
  }
};
