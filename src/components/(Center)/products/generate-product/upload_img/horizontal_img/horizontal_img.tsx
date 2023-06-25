import { $, component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import style from './horizontal_img.css?inline';
export const Horizontal_img = component$(
  ({ preview, onChange, previewIMGs, onHandlePreviewImgChange }: any) => {
    useStylesScoped$(style);
    const currentImgIndex = useSignal(0);
    const showNextImage = $(() => {
      currentImgIndex.value = currentImgIndex.value + 1;
    });
    return (
      <>
        <div class="image-upload-container">
          <div class="thumbnail-container">
            <div class="thumbnail active">
              {preview?.previewIMGPrimary == '' ? (
                <>
                  {' '}
                  <div class="image_primary_caption">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m20.475 23.3l-2.3-2.3H5q-.825 0-1.413-.588T3 19V5.825L.7 3.5l1.4-1.4l19.8 19.8l-1.425 1.4ZM5 19h11.175l-2-2H6l3-4l2 2.725l.85-1.05L5 7.825V19Zm16-.825l-2-2V5H7.825l-2-2H19q.825 0 1.413.588T21 5v13.175Zm-7.525-7.525ZM10.6 13.425Z"
                      />
                    </svg>
                  </div>
                </>
              ) : (
                <>
                  <label for={'file_primary'}>
                    <img
                      width={60}
                      height={60}
                      src={
                        preview?.previewIMGPrimary == ''
                          ? 'https://via.placeholder.com/60'
                          : preview?.previewIMGPrimary
                      }
                      alt="Thumbnail 1"
                    />
                  </label>
                  <input
                    style={{ display: 'none' }}
                    accept="image/*"
                    type="file"
                    id="file_primary"
                    name="file_primary"
                    onChange$={onChange}
                  />
                </>
              )}
            </div>
            {previewIMGs.previewIMGs
              .slice(0, currentImgIndex.value + 1)
              .map((img: any, index: any) => (
                <div key={index} class="thumbnail ">
                  <label for={`file_img${index}`}>
                    {img.length > 0 && (
                      <img
                        width={60}
                        height={60}
                        src={img}
                        alt={`Thumbnail ${index}`}
                      />
                    )}
                    {img.length === 0 && (
                      <div class="image-caption">New imagen</div>
                    )}
                  </label>
                  <input
                    style={{ display: 'none' }}
                    accept="image/*"
                    type="file"
                    id={`file_img${index}`}
                    name={`file_img${index}`}
                    onChange$={(e) => {
                      onHandlePreviewImgChange(e, index);
                      index == currentImgIndex.value ? showNextImage() : null;
                    }}
                  />
                </div>
              ))}
          </div>

          <div class="selected-image">
            <label for={'file'}>
              {preview?.previewIMGPrimary == '' ? (
                <>
                  {' '}
                  <div class="image_primary_caption">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h8q.425 0 .713.288T14 4q0 .425-.288.713T13 5H5v14h14v-8q0-.425.288-.713T20 10q.425 0 .713.288T21 11v8q0 .825-.588 1.413T19 21H5ZM17 7h-1q-.425 0-.713-.288T15 6q0-.425.288-.713T16 5h1V4q0-.425.288-.713T18 3q.425 0 .713.288T19 4v1h1q.425 0 .713.288T21 6q0 .425-.288.713T20 7h-1v1q0 .425-.288.713T18 9q-.425 0-.713-.288T17 8V7Zm-5.75 9L9.4 13.525q-.15-.2-.4-.2t-.4.2l-2 2.675q-.2.25-.05.525T7 17h10q.3 0 .45-.275t-.05-.525l-2.75-3.675q-.15-.2-.4-.2t-.4.2L11.25 16Zm.75-4Z"
                        />
                      </svg>
                    </span>
                    <span> New imagen</span>
                  </div>
                </>
              ) : (
                <>
                  <img
                    width={500}
                    height={500}
                    src={preview?.previewIMGPrimary}
                    alt="Main image"
                  />
                </>
              )}
            </label>
            <input
              style={{ display: 'none' }}
              accept="image/*"
              type="file"
              id="file"
              name="file"
              onChange$={onChange}
              multiple
            />
          </div>
        </div>
      </>
    );
  }
);
