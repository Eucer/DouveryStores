import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import style from './grid4_img.css?inline';
export const Grid4_img = component$(
  ({ preview, onChange, previewIMGs, onHandlePreviewImgChange }: any) => {
    useStylesScoped$(style);
    const currentImgIndex = useSignal(0);

    return (
      <div class="image-container">
        <div class="thumbnail-list">
          <div class="thumbnail ">
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
            />
          </div>

          {previewIMGs.previewIMGs
            .slice(0, currentImgIndex.value + 3)
            .map((img: any, index: any) => (
              <div key={index} class="thumbnail ">
                <label for={`file_img${index}`}>
                  {img == '' ? (
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
                      </div>{' '}
                    </>
                  ) : (
                    <>
                      {' '}
                      <img
                        width={350}
                        height={350}
                        src={img}
                        alt="Main image"
                      />
                    </>
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
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
);
