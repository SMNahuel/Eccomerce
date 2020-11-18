import React from 'react';
import s from './ImageUploader.module.css';

export default function ImageUploader({product, images, setInput}) {

    const onDragOver = e => e.preventDefault();
    const onDrop = e => {
        e.preventDefault();
        let names = images.map(i => i.name)
        
        var files = Array.from(e.dataTransfer.files)
        .filter(file => 
            file.type.match(/image-*/) && 
            !names.includes(file.name)
        )

        Promise.all(
            files.map(
                file => new Promise(resolve => {
                    let reader = new FileReader();
                    reader.onload = e => resolve({
                        name: file.name,
                        src: e.target.result
                    });
                    reader.readAsDataURL(file);
                })
            )
        )
        .then(imgs => setInput(input => ({
            ...input,
            images: images.concat(imgs)
        })))
    }

    return(
        <div className={s.container}>
            <div className={s.imagesContainer} onDragOver={onDragOver} onDrop={onDrop}>
                {images[0] &&
                    images.map((image, i) => <img key={i} src={image.src} alt=""/>)
                }
            </div>
        </div>
    );
}
