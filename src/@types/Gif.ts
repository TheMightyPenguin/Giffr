interface Image {
  url: string;
}

export interface Gif {
  id: string;
  images: {
    fixed_width_downsampled: Image;
    original: Image;
  };
}
