import airhornWebp from '../assets/toolbox/airhorn.webp';
import automatonWebp from '../assets/toolbox/automaton.webp';
import threeVrmInspectorWebp from '../assets/toolbox/three-vrm-inspector.webp';
import threePhongShaderInspectorWebp from '../assets/toolbox/three-phong-shader-inspector.webp';
import tweakpanePluginProfilerWebp from '../assets/toolbox/tweakpane-plugin-profiler.webp';
import tweakpanePluginRotationWebp from '../assets/toolbox/tweakpane-plugin-rotation.webp';
import obsvrThreeJsPMREMGeneratorWebp from '../assets/toolbox/0b5vr-three-js-pmremgenerator.webp';
import flipInvertWebp from '../assets/toolbox/flip-invert.webp';
import { Tool } from './Tool';

export const Toolbox: React.FC = () => (
  <ul className="grid grid-cols-3 gap-1 md:grid-cols-5">
    <Tool
      name="three-vrm-inspector"
      imageSrc={ threeVrmInspectorWebp }
      url="https://0b5vr.github.io/three-vrm-inspector"
    />
    <Tool
      name="three-phong-shader-inspector"
      imageSrc={ threePhongShaderInspectorWebp }
      url="https://three-phong-shader-inspector.glitch.me"
    />
    <Tool
      name="tweakpane-plugin-rotation"
      imageSrc={ tweakpanePluginRotationWebp }
      url="https://github.com/0b5vr/tweakpane-plugin-rotation"
    />
    <Tool
      name="tweakpane-plugin-profiler"
      imageSrc={ tweakpanePluginProfilerWebp }
      url="https://github.com/0b5vr/tweakpane-plugin-profiler"
    />
    <Tool
      name="0b5vr-three-js-pmremgenerator"
      imageSrc={ obsvrThreeJsPMREMGeneratorWebp }
      url="https://0b5vr-three-js-pmremgenerator.glitch.me/"
    />
    <Tool
      name="automaton"
      imageSrc={ automatonWebp }
      url="https://github.com/0b5vr/automaton"
    />
    <Tool
      name="airhorn.wav"
      imageSrc={ airhornWebp }
      url="https://airhorn-wav.glitch.me"
    />
    <Tool
      name="flip-invert"
      imageSrc={ flipInvertWebp }
      url="https://0b5vr.github.io/flip-invert"
    />
  </ul>
);
