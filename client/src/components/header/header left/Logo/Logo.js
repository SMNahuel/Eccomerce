import React, {useEffect, useState} from 'react';
import s from './Logo.module.css';

export default function Logo({load}) {
    const [loading, setLoading] = useState(load)
    useEffect(() => {setTimeout(() => setLoading(false), 6000)}, [setLoading])
    const [background, setBackground] = useState(load)
    useEffect(() => {setTimeout(() => setBackground(false), 7600)}, [setLoading])
    return(
        <div className={s.spaceReserve}>
            {background && <div className={loading ? s.backgroudLoading : s.backgroud} />}
            <div className={loading ? s.containerLoading : s.container}>
                <svg className={loading ? s.logoLoading : s.logo} viewBox="5 -20 22 32">
                    <g>
                        <animate id="a0" attributeName="opacity" from="0" to="1" dur="1s" />
                        <animateTransform id="a1" dur="3s" attributeName="transform" type="translateX" from="16" to="16" additive="sum" />
                        <animateTransform dur="3s" attributeName="transform" type="scale" from="1.2" to="1.2" additive="sum" />
                        <g>
                            <circle stroke="#55EFC4" strokeWidth=".5" fill="transparent" cx="0" cy="0" r="2" />

                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M-2,0 L-3,1 Q-5,3 -7,1 L-8,0 L-7,-1 Q-5,-3 -3,-1">
                                <animate attributeName="stroke-dasharray" from="0,14" to="0,14" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,14" to="14,14" dur="2s" />
                            </path>
                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M0,-2 L-1,-3 Q-3,-5 -1,-7 L0,-8 L1,-7 Q3,-5 1,-3">
                                <animate attributeName="stroke-dasharray" from="0,14" to="0,14" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,14" to="14,14" dur="2s" />
                            </path>
                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M2,0 L3,-1 Q5,-3 7,-1 L8,0 L7,1 Q5,3 3,1">
                                <animate attributeName="stroke-dasharray" from="0,14" to="0,14" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,14" to="14,14" dur="2s" />
                            </path>
                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M0,2 L1,3 Q3,5 1,7 L0,8 L-1,7 Q-3,5 -1,3">
                                <animate attributeName="stroke-dasharray" from="0,14" to="0,14" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,14" to="14,14" dur="2s" />
                            </path>

                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M-1.4,1.4 L-2.5,2.5 Q-5,5 -7.5,2.5 L-10,0 L-7.5,-2.5 Q-6.4,-3.6 -4.7,-3.5">
                                <animate attributeName="stroke-dasharray" from="0,18" to="0,18" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,18" to="18,18" dur="2s" />
                            </path>
                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M-1.4,-1.4 L-2.5,-2.5 Q-5,-5 -2.5,-7.5 L0,-10 L2.5,-7.5 Q3.6,-6.4 3.5,-4.7">
                                <animate attributeName="stroke-dasharray" from="0,18" to="0,18" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,18" to="18,18" dur="2s" />
                            </path>
                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M1.4,-1.4 L2.5,-2.5 Q5,-5 7.5,-2.5 L10,0 L7.5,2.5 Q6.4,3.6 4.7,3.5">
                                <animate attributeName="stroke-dasharray" from="0,18" to="0,18" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,18" to="18,18" dur="2s" />
                            </path>
                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M1.4,1.4 L2.5,2.5 Q5,5 2.5,7.5 L0,10 L-2.5,7.5 Q-3.6,6.4 -3.5,4.7">
                                <animate attributeName="stroke-dasharray" from="0,18" to="0,18" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,18" to="18,18" dur="2s" />
                            </path>

                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M0,2 L-1.5,3.5 Q-5,7 -8.5,3.5 L-7.5,2.5">
                                <animate attributeName="stroke-dasharray" from="0,12" to="0,12" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,12" to="12,12" dur="2s" />
                            </path>
                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M-2,0 L-3.5,-1.5 Q-7,-5 -3.5,-8.5 L-2.5,-7.5">
                                <animate attributeName="stroke-dasharray" from="0,12" to="0,12" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,12" to="12,12" dur="2s" />
                            </path>
                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M0,-2 L1.5,-3.5 Q5,-7 8.5,-3.5 L7.5,-2.5">
                                <animate attributeName="stroke-dasharray" from="0,12" to="0,12" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,12" to="12,12" dur="2s" />
                            </path>
                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M2,0 L3.5,1.5 Q7,5 3.5,8.5 L2.5,7.5">
                                <animate attributeName="stroke-dasharray" from="0,12" to="0,12" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,12" to="12,12" dur="2s" />
                            </path>

                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M-5,5 Q-5,7 -3.5,8.5 L-2.5,7.5">
                                <animate attributeName="stroke-dasharray" from="0,6" to="0,6" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,6" to="6,6" dur="2s" />
                            </path>
                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M-5,-5 Q-7,-5 -8.5,-3.5 L-7.5,-2.5">
                                <animate attributeName="stroke-dasharray" from="0,6" to="0,6" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,6" to="6,6" dur="2s" />
                            </path>
                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M5,-5 Q5,-7 3.5,-8.5 L2.5,-7.5">
                                <animate attributeName="stroke-dasharray" from="0,6" to="0,6" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,6" to="6,6" dur="2s" />
                            </path>
                            <path stroke="#55EFC4" strokeWidth=".5" fill="transparent" d="M5,5 Q7,5 8.5,3.5 L7.5,2.5">
                                <animate attributeName="stroke-dasharray" from="0,6" to="0,6" dur="1s" />
                                <animate begin="a0.end" attributeName="stroke-dasharray" from="0,6" to="6,6" dur="2s" />
                            </path>
                            <animateTransform id="a3" begin="a1.end" dur="1s" attributeName="transform" type="rotate" from="270" to="0" additive="sum" />
                            <animateTransform begin="wultur2.end" dur="30s" attributeName="transform" type="rotate" values="0; 0; 270" keyTimes="0; 0.96; 1" repeatCount="indefinite" />
                        </g>
                        <animateTransform id="a2" begin="a1.end" dur="1s" attributeName="transform" type="translateX" from="16" to="0" additive="sum" />
                        <animateTransform begin="a1.end" dur="1s" attributeName="transform" type="scale" from="1.2" to="1" additive="sum" />
                    </g>
                    <g>
                        <path transform="translate(12,5)" fill="#55EFC4" d="M6.84-7.77L6.84-7.77Q7.22-7.49 7.43-7.06L7.43-7.06L7.43-7.06Q7.64-6.63 7.64-6.19L7.64-6.19L7.64-6.19Q7.64-5.81 7.53-5.38L7.53-5.38L7.53-5.38Q7.41-4.94 7.23-4.53L7.23-4.53L5.15 0.24L3.86-3.23L2.58 0.24L-0.01-6.77L0.94-7.12L2.85-1.80L3.63-3.87L2.72-6.31L3.69-6.67L5.48-1.61L6.50-3.92L6.50-3.92Q6.67-4.34 6.77-4.69L6.77-4.69L6.77-4.69Q6.87-5.03 6.87-5.30L6.87-5.30L6.87-5.30Q6.87-6.20 6.02-6.89L6.02-6.89L6.84-7.77ZM12.29-5.14L12.29-0.87L12.29-0.87Q12.29-0.72 12.37-0.63L12.37-0.63L12.37-0.63Q12.44-0.53 12.58-0.53L12.58-0.53L12.58-0.53Q12.79-0.53 13.09-0.92L13.09-0.92L13.24-0.77L13.24-0.77Q13.03-0.32 12.73-0.14L12.73-0.14L12.73-0.14Q12.44 0.05 12.44 0.05L12.44 0.05L12.44 0.05Q12.44 0.05 12.18 0.05L12.18 0.05L12.18 0.05Q11.86 0.05 11.70-0.13L11.70-0.13L11.70-0.13Q11.53-0.31 11.46-0.78L11.46-0.78L11.46-0.78Q11.39-1.24 11.39-2.16L11.39-2.16L11.39-2.16Q11.39-2.71 11.40-3.04L11.40-3.04L11.32-3.24L11.29-3.24L11.29-3.24Q11.03-2.01 10.57-0.95L10.57-0.95L10.57-0.95Q10.10 0.12 9.24 0.12L9.24 0.12L9.24 0.12Q8.92 0.12 8.78-0.04L8.78-0.04L8.78-0.04Q8.63-0.20 8.60-0.48L8.60-0.48L8.60-0.48Q8.57-0.75 8.57-1.32L8.57-1.32L8.57-4.14L8.57-4.14Q8.57-4.31 8.50-4.41L8.50-4.41L8.50-4.41Q8.42-4.51 8.29-4.51L8.29-4.51L8.29-4.51Q8.05-4.51 7.75-4.11L7.75-4.11L7.63-4.27L7.63-4.27Q7.79-4.65 8.04-4.83L8.04-4.83L8.04-4.83Q8.28-5.02 8.50-5.07L8.50-5.07L8.50-5.07Q8.71-5.11 8.71-5.08L8.71-5.08L8.71-5.08Q8.70-5.08 8.68-5.08L8.68-5.08L8.68-5.08Q8.66-5.07 8.62-5.07L8.62-5.07L8.62-5.07Q9.48-5.07 9.48-4.08L9.48-4.08L9.48-1.20L9.48-1.20Q9.48-0.98 9.53-0.89L9.53-0.89L9.53-0.89Q9.58-0.79 9.65-0.79L9.65-0.79L9.65-0.79Q10.08-0.79 10.45-1.63L10.45-1.63L10.45-1.63Q10.82-2.47 11.05-3.48L11.05-3.48L11.05-3.48Q11.29-4.49 11.29-4.69L11.29-4.69L12.29-5.14ZM15.20-9.24L15.20-0.84L15.20-0.84Q15.20-0.72 15.27-0.61L15.27-0.61L15.27-0.61Q15.34-0.50 15.51-0.50L15.51-0.50L15.51-0.50Q15.65-0.50 15.80-0.63L15.80-0.63L15.80-0.63Q15.96-0.75 16.04-0.89L16.04-0.89L16.21-0.74L16.21-0.74Q16.04-0.41 15.74-0.18L15.74-0.18L15.74-0.18Q15.44 0.05 15.14 0.05L15.14 0.05L15.14 0.05Q14.30 0.05 14.30-0.96L14.30-0.96L14.30-8.86L15.20-9.24ZM18.30-7.66L18.30-5L19.69-5L19.39-4.36L18.30-4.36L18.30-0.84L18.30-0.84Q18.30-0.69 18.39-0.59L18.39-0.59L18.39-0.59Q18.48-0.50 18.63-0.50L18.63-0.50L18.63-0.50Q18.84-0.50 19.21-0.89L19.21-0.89L19.35-0.74L19.35-0.74Q19.16-0.36 18.89-0.18L18.89-0.18L18.89-0.18Q18.63 0.01 18.39 0.06L18.39 0.06L18.39 0.06Q18.16 0.10 18.16 0.06L18.16 0.06L18.16 0.06Q18.17 0.06 18.19 0.06L18.19 0.06L18.19 0.06Q18.21 0.05 18.25 0.05L18.25 0.05L18.25 0.05Q17.37 0.05 17.37-0.96L17.37-0.96L17.37-4.36L16.62-4.36L16.93-5L17.37-5L17.37-7.30L18.30-7.66ZM24.67-5.14L24.67-0.87L24.67-0.87Q24.67-0.72 24.74-0.63L24.74-0.63L24.74-0.63Q24.82-0.53 24.96-0.53L24.96-0.53L24.96-0.53Q25.17-0.53 25.47-0.92L25.47-0.92L25.62-0.77L25.62-0.77Q25.41-0.32 25.11-0.14L25.11-0.14L25.11-0.14Q24.82 0.05 24.82 0.05L24.82 0.05L24.82 0.05Q24.82 0.05 24.56 0.05L24.56 0.05L24.56 0.05Q24.24 0.05 24.07-0.13L24.07-0.13L24.07-0.13Q23.91-0.31 23.84-0.78L23.84-0.78L23.84-0.78Q23.77-1.24 23.77-2.16L23.77-2.16L23.77-2.16Q23.77-2.71 23.78-3.04L23.78-3.04L23.70-3.24L23.67-3.24L23.67-3.24Q23.41-2.01 22.95-0.95L22.95-0.95L22.95-0.95Q22.48 0.12 21.62 0.12L21.62 0.12L21.62 0.12Q21.30 0.12 21.15-0.04L21.15-0.04L21.15-0.04Q21.01-0.20 20.98-0.48L20.98-0.48L20.98-0.48Q20.95-0.75 20.95-1.32L20.95-1.32L20.95-4.14L20.95-4.14Q20.95-4.31 20.88-4.41L20.88-4.41L20.88-4.41Q20.80-4.51 20.67-4.51L20.67-4.51L20.67-4.51Q20.43-4.51 20.13-4.11L20.13-4.11L20.01-4.27L20.01-4.27Q20.17-4.65 20.41-4.83L20.41-4.83L20.41-4.83Q20.66-5.02 20.88-5.07L20.88-5.07L20.88-5.07Q21.09-5.11 21.09-5.08L21.09-5.08L21.09-5.08Q21.08-5.08 21.06-5.08L21.06-5.08L21.06-5.08Q21.04-5.07 21-5.07L21-5.07L21-5.07Q21.86-5.07 21.86-4.08L21.86-4.08L21.86-1.20L21.86-1.20Q21.86-0.98 21.91-0.89L21.91-0.89L21.91-0.89Q21.96-0.79 22.03-0.79L22.03-0.79L22.03-0.79Q22.46-0.79 22.83-1.63L22.83-1.63L22.83-1.63Q23.20-2.47 23.43-3.48L23.43-3.48L23.43-3.48Q23.67-4.49 23.67-4.69L23.67-4.69L24.67-5.14ZM28.52-3.78L28.52-3.78Q28.07-3.31 27.74-2.56L27.74-2.56L27.74-2.56Q27.42-1.80 27.42-1.18L27.42-1.18L27.42-1.18Q27.42-0.64 27.65-0.28L27.65-0.28L27.65-0.28Q27.89 0.09 28.41 0.09L28.41 0.09L28.41 0.09Q28.83 0.09 29.21-0.13L29.21-0.13L29.21-0.13Q29.60-0.35 29.87-0.70L29.87-0.70L29.76-0.85L29.76-0.85Q29.45-0.64 29.15-0.64L29.15-0.64L29.15-0.64Q28.68-0.64 28.44-0.97L28.44-0.97L28.44-0.97Q28.20-1.30 28.20-1.77L28.20-1.77L28.20-1.77Q28.20-2.53 28.59-3.21L28.59-3.21L28.59-3.21Q28.98-3.89 29.58-4.53L29.58-4.53L29.42-4.67L29.42-4.67Q28.72-4.23 28.14-4.23L28.14-4.23L28.14-4.23Q27.80-4.23 27.52-4.54L27.52-4.54L27.52-4.54Q27.24-4.84 27.09-5.21L27.09-5.21L26.28-4.30L26.28-4.30Q26.35-4.10 26.66-3.84L26.66-3.84L25.99-2.44L26.36-2.27L27.01-3.70L27.01-3.70Q27.18-3.63 27.29-3.61L27.29-3.61L27.29-3.61Q27.40-3.59 27.59-3.59L27.59-3.59L27.59-3.59Q28.08-3.59 28.49-3.81L28.49-3.81L28.52-3.78Z"></path>
                        <animate id="wultur1" dur="4.5s" attributeName="opacity" from="0" to="0" />
                        <animate id="wultur2" begin="wultur1.end" dur="1s" attributeName="opacity" from="0" to="1" />
                    </g>
                </svg>
            </div>
        </div>
    );
}