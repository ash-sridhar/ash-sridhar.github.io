from pathlib import Path
from html import escape
from math import sin, pi
p=Path(__file__).resolve().parent.parent / 'assets'
PRE='''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380" role="img" aria-label="Concept illustration"><defs><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#9e7ec3" stroke-width=".7" opacity=".12"/></pattern><linearGradient id="base" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#251939"/><stop offset="1" stop-color="#140c22"/></linearGradient><linearGradient id="trace" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#bd9fdf"/><stop offset="1" stop-color="#de84b5"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="5" /></filter></defs><rect width="600" height="380" fill="url(#base)"/><rect width="600" height="380" fill="url(#grid)"/><rect x="17" y="17" width="566" height="346" rx="2" fill="none" stroke="#a891c2" stroke-opacity=".16"/><path d="M17 52H583" stroke="#a891c2" stroke-opacity=".15"/><text x="35" y="39" font-family="monospace" font-size="10" fill="#b19dc9" letter-spacing="2">{label}</text><text x="560" y="39" text-anchor="end" font-family="monospace" font-size="10" fill="#d989b4">{code}</text>'''
END='''<text x="35" y="346" font-family="monospace" font-size="9" fill="#ae98c7" opacity=".8" letter-spacing="1.5">CONCEPTUAL PROJECT ARTWORK / NOT MEASURED DATA</text></svg>'''

def svg(label,code,body):
 return PRE.format(label=escape(label),code=escape(code))+body+END

def path(d,col='#bd9fdf',w=2,opacity=1,extra=''):
 return f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{w}" opacity="{opacity}" {extra}/>'

def text(x,y,s,size=12,color='#bd9fdf',anchor=None):
 return f'<text x="{x}" y="{y}" font-family="monospace" font-size="{size}" fill="{color}"'+(f' text-anchor="{anchor}"' if anchor else '')+'>'+escape(s)+'</text>'

def rr(x,y,w,h,fill='#271b3d',stroke='#7f5ca7',rx=5,strokeWidth=1.3):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{strokeWidth}"/>'

def circle(x,y,r,fill='#e295bf',extra=''):
 return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" {extra}/>'

def arrow(x1,y1,x2,y2,col='#bd9fdf'):
 return f'<path d="M{x1} {y1} L{x2} {y2}" stroke="{col}" stroke-width="1.5"/><path d="M{x2-6} {y2-5} L{x2} {y2} L{x2-6} {y2+5}" stroke="{col}" stroke-width="1.5" fill="none"/>'

# VCO ring with inverters
b=''
for i in range(5):
 x=70+i*96
 b+=rr(x,121,73,74,fill='#24173b',stroke='#a379d3')
 b+=f'<path d="M{x+16} 140L{x+16} 174L{x+45} 157Z" fill="none" stroke="#c3abde" stroke-width="2"/>'+circle(x+51,157,4,'none','stroke="#c3abde" stroke-width="2"')
 b+=text(x+36,210,f'S{i+1}',10,anchor='middle')
 if i<4:b+=arrow(x+73,157,x+91,157)
b+=path('M526 157H551V99H48V157H69','#d58ab3',2,opacity=.72)
# waveform
pts=[]
for i in range(181):
 x=46+i*2.8
 y=264-32*sin(i/180*8*pi)
 pts.append(('M' if i==0 else 'L')+f'{x:.1f} {y:.1f}')
b+=path(' '.join(pts),'url(#trace)',3)+text(47,322,'5 STAGES  /  CURRENT-STARVED VCO',10,'#bdaad4')
(p/'vco.svg').write_text(svg('ANALOG / OSCILLATOR','01 // SKY130',b))

# Buffer diagram
b=''
for i in range(6):
 x=40+i*87
 w=43+i*3
 h=34+i*15
 y=193-h/2
 b+=rr(x,y,w,h,fill='#23153c',stroke='#b191d7',rx=3)
 b+=f'<path d="M{x+10} {193-h*.27:.1f}V{193+h*.27:.1f}L{x+w-16} 193Z" fill="none" stroke="#df93bc" stroke-width="1.7"/>'+circle(x+w-10,193,3,'none','stroke="#df93bc" stroke-width="1.5"')
 b+=text(x+17,259,'X'+str(2**i),10,anchor='middle')
 if i<5:b+=arrow(x+w,193,x+87,193)
b+=text(41,95,'VIN',13,'#bd9fdf')+text(555,95,'VOUT',13,'#df89b7',anchor='end')+path('M40 109H554','#805fa7',1,extra='stroke-dasharray="4 9"')+text(41,318,'DRIVE STRENGTH  -->  LOAD',11,'#bdaad4')
(p/'buffer.svg').write_text(svg('DIGITAL / TAPERED BUFFER','02 // LVS',b))

# Automation
b=rr(39,82,310,218,fill='#201336',stroke='#7f5da6',rx=4)
b+=path('M39 115H349','#7f5da6',1)+text(56,103,'AUTOMATED MEASUREMENT MATRIX',10)
for row in range(7):
 for col in range(16):
  x=58+col*17.1;y=135+row*19
  color='#bd9fdf' if ((row+col*3)%7)>1 else '#d789b3'
  b+=rr(round(x,1),y,11,11,fill=color,stroke='none',rx=2,strokeWidth=0)
b+=rr(374,82,189,218,fill='#1c112f',stroke='#7f5da6')+text(391,103,'SCOPE / CH 01',10)
ps=[]
for i in range(121):
 x=387+i*1.37
 y=179-37*sin(i/120*6*pi)*(.52+.48*sin(i/120*pi))
 ps.append(('M' if not i else 'L')+f'{x:.1f} {y:.1f}')
b+=path(' '.join(ps),'url(#trace)',2.6)
b+=text(392,265,'RUN: COMPLETE',10,'#bd9fdf')+text(48,326,'126 MEASUREMENTS  /  18 CONFIGURATIONS',10,'#d496b7')
(p/'automation.svg').write_text(svg('LAB / INSTRUMENT CONTROL','03 // PYTHON',b))

# Switching
b=''
for x in [167,325]:
 for y in [120,220]:
  b+=rr(x,y,71,45,fill='#251939',stroke='#a484c9',rx=3)+text(x+35,y+27,'SW',12,anchor='middle')
b+=path('M202 120V94H360V120 M202 265V297H360V265 M202 165V220 M360 165V220','#dd85b5',2.2)
b+=rr(257,172,47,35,fill='#362a4b',stroke='#dd8eb9')+text(281,194,'LOAD',10,'#e5afcc',anchor='middle')
b+=path('M237 186H257 M304 186H325','#db8bb6',1.8)+text(286,83,'H-BRIDGE',11,'#b79cd5',anchor='middle')
b+=path('M54 180H135V132H142V232H149V162H156','#ad8bd4',2)+text(54,250,'PULSE',10)
b+=path('M406 234h18v-65h25v65h31v-95h25v95h40','#e192bd',2)+text(415,265,'TIMING',10,'#dc92ba')
(p/'switching.svg').write_text(svg('LAB / CIRCUIT VALIDATION','04 // PULSE',b))

# PCB
b=rr(63,77,470,238,fill='#27124c',stroke='#b2dbab',rx=13,strokeWidth=2)
for x in range(74,521,19):
 for y in [88,305]:b+=circle(x,y,1.6,'#cd8caf')
b+=rr(78,156,58,76,fill='#adb9b5',stroke='#e5b5cf',rx=3)+rr(87,168,41,52,fill='#44345f',stroke='#ba9eda',rx=2)
b+=rr(217,138,100,94,fill='#1d1132',stroke='#cd82ab',rx=4)+text(267,185,'LM555',17,'#d796b9',anchor='middle')+text(266,207,'ASTABLE',10,'#b09bc8',anchor='middle')
for i in range(6):
 x=370+i*25
 b+=circle(x,162,9,'#d27eab')+circle(x,162,3,'#f7badb')
 b+=rr(x-7,211,14,12,fill='#382558',stroke='#9b7ac1',rx=2)
b+=path('M136 180H165V113H269V137 M136 205H190V262H432V221 M317 173H348V148H369 M317 197H354V217H368','#c5719e',3)
for x,y in [(165,113),(269,137),(190,262),(432,221),(354,217)]:b+=circle(x,y,5,'#d282ad')+circle(x,y,2,'#382558')
b+=text(87,102,'USB-C / 5V',10,'#d6afc4')+text(374,276,'LED ARRAY x6',10,'#c7b1e1')
(p/'pcb.svg').write_text(svg('BOARD / PCB DESIGN','05 // ALTIUM',b))

# firmware
b=rr(60,104,220,176,fill='#26193c',stroke='#9373b9',rx=7)+text(80,136,'ARDUINO UNO',13,'#cf90b2')
b+=rr(104,160,133,85,fill='#1b112c',stroke='#da88b4',rx=3)+text(171,199,'MCU',20,'#c2aade',anchor='middle')+text(172,221,'C++',12,'#dc88b5',anchor='middle')
b+=rr(359,105,171,174,fill='#23163a',stroke='#9b81ba',rx=5)+text(444,136,'BME280',15,'#c2aadd',anchor='middle')
for i in range(4):
 b+=rr(396+(i%2)*56,164+(i//2)*51,33,22,fill='#3a2a56',stroke='#aa8ccd',rx=2)
for y,label in [(169,'SDA'),(208,'SCL'),(247,'CLK')]:
 b+=path(f'M280 {y}H359', '#bda3db' if label!='CLK' else '#df8fba',2,extra='stroke-dasharray="6 5"')+text(310,y-8,label,9,'#af9ac8')
b+=text(64,322,'EMBEDDED C++  /  I2C + SPI  /  SENSOR INTERFACES',10)
(p/'firmware.svg').write_text(svg('EMBEDDED / SENSOR SYSTEM','06 // FIRMWARE',b))

# robotics
b=''
b+=rr(138,180,296,96,fill='#312645',stroke='#a489c4',rx=8)
for x in [176,388]:
 b+=circle(x,292,23,'#130c1f','stroke="#a086bd" stroke-width="5"')+circle(x,292,8,'#d883b1')
b+=rr(201,139,170,54,fill='#201534',stroke='#9677ba')+text(286,172,'CONTROLLER',14,anchor='middle')
b+=path('M285 139V111H320L344 88','#dc92ba',3)
b+=rr(337,76,52,35,fill='#2c2140',stroke='#dc92ba')+circle(365,92,7,'#c3a8e3')
b+=path('M389 92H535 M389 92L537 55 M389 92L541 134','#cf8aaf',1,opacity=.6,extra='stroke-dasharray="6 8"')
b+=rr(486,60,65,79,fill='none',stroke='#c57ca3')+text(519,161,'VISION',10,'#d086ae',anchor='middle')
b+=path('M98 245H138 M434 245H465','#ad8ed0',2)+text(76,178,'AUTO',12,'#b69cd4')+text(79,194,'MODE',12,'#b69cd4')
(p/'robotics.svg').write_text(svg('SYSTEMS / ROBOTICS','07 // JAVA',b))

# Discovery placeholder
b=rr(137,68,325,254,fill='#221637',stroke='#9c82bb',rx=6)
for y,w in [(112,181),(136,247),(160,221),(260,217),(280,171)]:b+=rr(168,y,w,3,fill='#7b59a2',stroke='none',rx=1,strokeWidth=0)
b+=rr(184,186,110,51,fill='#31234a',stroke='#d188af',rx=2)+rr(337,188,87,45,fill='#31234a',stroke='#9d7ec1',rx=2)
b+=path('M294 209H337 M382 188V168 M236 237V249','#cb8daf',2,extra='stroke-dasharray="6 5"')
b+=circle(458,94,39,'none','stroke="#db91b9" stroke-width="2"')+text(457,104,'?',30,'#db91b9',anchor='middle')
b+=text(183,302,'DOCUMENT / ITERATE / SHARE',10,'#b99fd8')
(p/'discovery.svg').write_text(svg('ECE / DISCOVERY PROJECT','08 // WIP',b))

(p/'favicon.svg').write_text('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#140c22"/><text x="9" y="46" font-family="Arial,sans-serif" font-size="40" font-weight="bold" letter-spacing="-5" fill="#c5aae4">a.s</text></svg>''')
print('SVG assets:',[x.name for x in p.glob('*.svg')])
