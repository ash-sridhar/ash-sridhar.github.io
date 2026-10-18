/*
  EDIT THIS FILE TO UPDATE YOUR SITE.
  To add a project, duplicate one object inside `projects`, assign a unique id,
  change its text, and point `image` to an SVG / PNG / JPG under .
  No HTML or CSS changes required.
*/
window.PORTFOLIO = {
  person: {
    name: 'Ashwath Sridhar',
    shortName: 'Ashwath',
    role: 'Electrical Engineering Student',
    school: 'Georgia Institute of Technology',
    location: 'Atlanta, Georgia',
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
    { id: 'testing', label: 'Test + automation' },
    { id: 'robotics', label: 'Robotics' }
  ],
  projects: [
    {
      id: 'vco',
      number: '01',
      title: '450–550 MHz Ring VCO',
      eyebrow: 'Analog / mixed-signal',
      category: 'ic',
      featured: true,
      image: 'vco-layout.webp',
      imageAlt: 'Cadence Virtuoso full-custom layout of the five-stage VCO and its six-stage buffer, from my design review',
      period: '2026 · SiliconJackets',
      tags: ['SKY130', 'Cadence Virtuoso', 'Analog IC', 'Verification'],
      metric: '451.2–549.6 MHz',
      metricLabel: 'tt corner, 0–70°C',
      teaser: 'Transistor-level design, biasing, verification, and full-custom layout of a current-starved oscillator in 130 nm CMOS.',
      challenge: 'Design a compact current-starved ring voltage-controlled oscillator with a stable, controllable frequency range while respecting power and implementation constraints. The target was 450–550 MHz under 500 µW at a 1.8 V supply, with behavior checked across environmental and manufacturing variation.',
      approach: 'I sized a five-stage oscillator from device and process parameters, constructed a current-mirror bias network, and evaluated transient behavior in Cadence Virtuoso. Temperature sweeps revealed frequency drift that I traced to PMOS threshold-voltage variation relative to the available bias overdrive. I reduced VIN to 0.327 V and revised the current-source PFETs to 420 nm width and 430 nm length before repeating temperature and process-corner simulations. I connected the design to a six-stage tapered buffer sized to drive a 1 pF load.',
      outcome: 'At the tt process corner, the simulated oscillator covered 451.2–549.6 MHz from 0–70 °C, within the stated specification. The same review measured 51.01–51.66% duty cycle, 202.2–205.7 ps rise time, and 37.6–47.5 µW of ring-only power. Separate 27 °C process-corner checks found approximately 704.8 MHz at ff and 314.9 MHz at ss; those corners were characterized, not claimed to meet the tt temperature specification. I completed full-custom layout with multi-finger devices and guard rings, achieving zero DRC violations and a clean LVS match in Cadence Pegasus before documenting the design review.',
      takeaway: 'The most important lesson was that analog design is iterative. A circuit can satisfy the nominal target and still fail once device behavior changes with temperature. Tracing a drift mechanism back to device physics was more valuable than just tuning parameters until the plot looked right.',
      gallery: [
        { image: 'vco-layout.webp', alt: 'The full custom VCO and tapered-buffer layout in Cadence Virtuoso', caption: 'Full-custom layout: VCO at left, six-stage buffer at right' },
        { image: 'vco-schematics.webp', alt: 'Current-starved oscillator and buffer schematics', caption: 'Five-stage ring, output buffer, and testbench schematics' },
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
      id: 'buffer',
      number: '02',
      title: 'Six-Stage Output Buffer',
      eyebrow: 'Custom layout / verification',
      category: 'ic',
      featured: false,
      image: 'vco-schematics.webp',
      imageAlt: 'Actual Cadence Virtuoso design-review slide showing oscillator and output buffer schematics',
      period: '2026 · SiliconJackets',
      tags: ['CMOS', 'Layout', 'DRC / LVS', 'Cadence'],
      metric: '0 violations',
      metricLabel: 'design rule check',
      teaser: 'Tapered CMOS inverter chain and a complete custom physical layout for an oscillator output stage.',
      challenge: 'A high-speed oscillator core cannot necessarily drive a large capacitive load directly without changing the measured waveform. The output network needed progressive drive strength as well as a layout that respected fabrication constraints.',
      approach: 'I designed a chain of six tapered inverters with increasing transistor drive strength. While implementing the layout, I worked through device finger sizing, power distribution, shared signal routing, body connections, and guard-ring placement. I also diagnosed local-interconnect spacing and width violations and a large set of off-grid geometry errors, correcting the geometry before running final checks.',
      outcome: 'The finished output buffer was included in the VCO verification flow driving a 1 pF load. The full-custom layout passed design-rule checking with zero violations and produced a clean layout-versus-schematic match using Cadence Pegasus. That meant the layout was not only geometrically compliant but also electrically consistent with the intended circuit.',
      takeaway: 'Layout changed the way I think about schematic design. Routing, well ties, guard rings, and manufacturing grids are part of the circuit—not just final documentation after the interesting work is done.'
    },
    {
      id: 'automation',
      number: '03',
      title: 'Oscilloscope Automation',
      eyebrow: 'Test engineering / Python',
      category: 'testing',
      featured: true,
      image: 'automation.svg',
      imageAlt: 'Original conceptual oscilloscope sweep graphic with a grid of measurements',
      period: 'Summer 2026 · huMannity Medtec',
      tags: ['Python', 'Oscilloscope', 'GUI', 'Hardware Test'],
      metric: '8 hr → <3 min',
      metricLabel: 'full characterization sweep',
      teaser: 'Built a Python-controlled measurement workflow that turned an eight-hour manual process into a repeatable automated sweep.',
      challenge: 'A characterization procedure involved 126 measurement points across 18 operating configurations. Executing and recording the sweep by hand took roughly eight hours, making repeated testing slow and vulnerable to manual inconsistencies.',
      approach: 'During my electrical engineering internship, I wrote a custom Python script and graphical interface to automate the oscilloscope characterization process. The workflow sequenced operating conditions, captured the requested measurement points, and reduced the repetitive steps that had previously required constant operator involvement. My focus was not only speed, but repeatability and making the test easier for someone else to run.',
      outcome: 'The complete characterization sweep fell from an eight-hour manual procedure to under three minutes. This freed engineering time for analyzing results, comparing design revisions, and troubleshooting hardware rather than repeating the same instrument actions. It also reinforced the value of connecting software tools to physical test environments.',
      takeaway: 'I enjoy engineering work where software and hardware amplify each other. An automation tool is most valuable when it is reliable, comprehensible, and designed for the person who will use it next.'
    },
    {
      id: 'switching',
      number: '04',
      title: 'Switching & Signal Validation',
      eyebrow: 'Circuit design / debug',
      category: 'testing',
      featured: false,
      image: 'switching.svg',
      imageAlt: 'Original conceptual circuit illustration showing switching transients and signal pulses',
      period: 'Summer 2026 · huMannity Medtec',
      tags: ['Circuit Validation', 'Oscilloscope', 'ECG', 'Debugging'],
      metric: '40 ns',
      metricLabel: 'current transients characterized',
      teaser: 'Investigated timing, polarity, switching transients, and low-amplitude signal acquisition in medical-device electronics.',
      challenge: 'Hardware validation required checking whether real measured signals matched the intended circuit behavior. Challenges included a pulse switching circuit with a schematic issue, brief current transients, and an ECG acquisition board that missed low-amplitude R-wave signals.',
      approach: 'I designed and tested a switching circuit for pulse timing and polarity, used oscilloscope measurements to examine its behavior, and identified a schematic error that was corrected in the official design. In a separate signal-chain investigation, I diagnosed why the acquisition path was not detecting smaller signals and evaluated amplifier gain as a correction. I approached both problems by connecting the schematic, expected signals, and what the instruments actually showed.',
      outcome: 'Switching validation achieved 98% timing accuracy, with current spikes characterized down to 40 ns. The signal-acquisition work enabled reliable R-wave peak detection down to 0.5 mV following amplifier gain optimization. Both outcomes depended on treating surprising measurement results as evidence to investigate, not noise to ignore.',
      takeaway: 'Good debugging means being willing to question the design and the test setup. I learned to make targeted measurements, form a hypothesis, and change one thing at a time.'
    },
    {
      id: 'pcb',
      number: '05',
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
      number: '06',
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
    },
    {
      id: 'robotics',
      number: '07',
      title: 'Autonomous Robotics Software',
      eyebrow: 'Leadership / controls software',
      category: 'robotics',
      featured: false,
      image: 'robotics.svg',
      imageAlt: 'Original conceptual robot chassis and computer-vision target illustration',
      period: '2022–2025 · FIRST Robotics',
      tags: ['Java', 'Computer Vision', 'Controls', 'Mentoring'],
      metric: '10+ peers',
      metricLabel: 'programmers mentored',
      teaser: 'Led drivetrain, vision tracking, and arm-control development while helping new programmers become independent contributors.',
      challenge: 'A competition robot needs several software subsystems to work together reliably, especially when scoring decisions are made autonomously under time pressure. The team also needed to grow its programming capacity across seasons.',
      approach: 'As lead programmer, I worked on Java implementations for drivetrain control, Limelight vision tracking, and arm operation. I coordinated work across these features while mentoring more than ten newer programmers in object-oriented programming, debugging, and how to test robot behavior. I tried to make the codebase approachable so others could independently own meaningful functionality.',
      outcome: 'The software work improved autonomous scoring consistency and contributed to a first-place finish at SoCal Showdown. The mentoring aspect became equally meaningful: seeing others diagnose and implement features themselves showed me the value of clear technical communication.',
      takeaway: 'Leadership in engineering is not just solving the hardest problem alone. It is building a team that can recognize problems, share context, and keep making progress when you are not in the room.'
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
