import React from "react";
import { convertToRaw } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import Dante from "Dante2";
import { ImageBlockConfig } from "Dante2/package/es/components/blocks/image.js";
import { PlaceholderBlockConfig } from "Dante2/package/es/components/blocks/placeholder.js";
import { DanteTooltipConfig } from "Dante2/package/es/components/popovers/toolTip.js";
import { DanteInlineTooltipConfig } from "Dante2/package/es/components/popovers/addButton.js";
import Icons from "Dante2/package/es/components/icons";
import { API_ROOT } from "../../agent";
class DanteEditor extends React.Component {
  render() {
    const { content, onChange, readOnly, bodyPlaceholder } = this.props;
    return (
      <Dante
        read_only={readOnly}
        content={
          content
            ? convertToRaw(
                convertFromHTML({
                  htmlToEntity: (nodeName, node, createEntity) => {
                    if (nodeName === "a") {
                      return createEntity("LINK", "MUTABLE", {
                        url: node.href
                      });
                    }
                  },
                  htmlToBlock: (nodeName, node) => {
                    if (node.parentElement.classList.contains("image")) {
                      return;
                    }
                    if (node.classList.contains("image")) {
                      return {
                        text: "",
                        type: "image",
                        data: {
                          caption: "Описание (не обязательно)",
                          aspect_ratio: {
                            width: node.querySelector("img").width,
                            height: node.querySelector("img").height,
                            ratio:
                              (node.querySelector("img").height /
                                node.querySelector("img").width) *
                              100
                          },
                          width: node.querySelector("img").width,
                          height: node.querySelector("img").height,
                          url: node.querySelector("img").src,
                          direction: "center"
                        }
                      };
                    }
                    if (nodeName === "img") {
                      return {
                        type: "blockquote",
                        data: {}
                      };
                    }
                  }
                })(content)
              )
            : ""
        }
        body_placeholder={bodyPlaceholder}
        tooltips={[
          DanteTooltipConfig({
            widget_options: {
              placeholder: "Вставьте ссылку...",
              block_types: [
                {
                  label: "h3",
                  style: "header-two",
                  type: "block",
                  icon: Icons.h2
                },
                { type: "separator" },
                { type: "link" },

                {
                  label: "blockquote",
                  style: "blockquote",
                  type: "block",
                  icon: Icons.blockquote
                },
                { type: "separator" },
                {
                  label: "bold",
                  style: "BOLD",
                  type: "inline",
                  icon: Icons.bold
                },
                {
                  label: "italic",
                  style: "ITALIC",
                  type: "inline",
                  icon: Icons.italic
                },
                {
                  label: "insertunorderedlist",
                  style: "unordered-list-item",
                  type: "block",
                  icon: Icons.insertunorderedlist
                },
                {
                  label: "insertorderedlist",
                  style: "ordered-list-item",
                  type: "block",
                  icon: Icons.insertunorderedlist
                }
              ]
            }
          }),
          DanteInlineTooltipConfig({})
        ]}
        onChange={editor => {
          onChange(
            convertToHTML({
              blockToHTML: (entity, originalText) => {
                if (entity.type === "image") {
                  return `
                <div class="image">
                  <img
                    src='${entity.data.url}'
                    alt="${entity.text}"
                    width="${entity.data.width}"
                    height="${entity.data.height}"/>
                  <p class="imageCaption">${entity.text}</p>
                </div>`;
                }
                return originalText;
              },
              entityToHTML: (entity, originalText) => {
                if (entity.type === "LINK") {
                  return `<a href="${entity.data.url}">${originalText}</a>`;
                }
                return originalText;
              }
            })(editor.state.editorState.getCurrentContent())
          );
        }}
        widgets={[
          ImageBlockConfig({
            options: {
              upload_url: `${API_ROOT}/images`,
              upload_headers: {
                Authorization: `Token ${window.localStorage.getItem("jwt")}`
              },
              image_caption_placeholder: "Описание (не обязательно)"
            }
          }),
          PlaceholderBlockConfig()
        ]}
      />
    );
  }
}
export default DanteEditor;
