const importImages = (img) =>{
    return new URL(`../assets/${img}`,import.meta.url).href;
};

export default importImages;