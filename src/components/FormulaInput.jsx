import React, { useState, useRef, useEffect } from "react";
import { charactersList } from "../stores/formulas";
// import './FormulaInput.css';  // Assuming you have a CSS file for styles

function FormulaInput({ data }) {
  const [content, setContent] = useState("");
  const contentRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [allTags, setAllTags] = useState([
    { tag: "Payroll", value: 10 },
    { tag: "Sales", value: 20 },
    { tag: "Marketing", value: 30 },
    { tag: "HR", value: 40 },
    { tag: "IT", value: 50 },
    { tag: "Finance", value: 60 },
    { tag: "Operations", value: 70 },
    { tag: "Income Tax", value: 80 },
    { tag: "tag1", value: 90 },
    { tag: "tag2", value: 100 },
    { tag: "tag3", value: 110 },
    { tag: "tag4", value: 120 },
    { tag: "tag5", value: 130 },
    { tag: "tag6", value: 140 },
    { tag: "tag7", value: 150 },
    { tag: "tag8", value: 160 },
  ]);

  const handleKeyPress = (e) => {
    // if (e.key === 'Enter') {
    e.preventDefault();
    const text = contentRef.current.innerText;
    //   const splitValues = text.split(/([+\-*/])/).filter(Boolean);
    // should split on all operators and brackets and on ^
    const splitValues = text.split(/([+\-*/()^])/).filter(Boolean);

    const formattedContent = splitValues
      .map((item) => {
        if (["+", "-", "*", "/", "(", ")", "^"].includes(item)) {
          return `<span class="operator">${item}</span>`;
        } else {
          return `<span class="tag">${item}</span>`;
        }
      })
      .join("");

    setContent(formattedContent);
    contentRef.current.innerHTML = formattedContent;
    //   point cursor to end of content
    // set value to charactersList store
    charactersList.value = charactersList.value.map((item) => {
      if (item.id === data.id) {
        return {
          ...item,
          content: text,
        };
      }
    });

    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(
      contentRef.current.childNodes[contentRef.current.childNodes.length - 1],
      1
    );
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    // }
  };

  useEffect(() => {
    // check if last character is not operator or bracket then check last character and filter from allTags and set suggestions
    if (contentRef.current.innerText.length > 0) {
      const lastChar =
        contentRef.current.innerText[contentRef.current.innerText.length - 1];
      if (!["+", "-", "*", "/", "(", ")", "^"].includes(lastChar)) {
        const lastTag = contentRef.current.innerText
          .split(/([+\-*/()^])/)
          .filter(Boolean)
          .pop();
        const filteredTags = allTags.filter((tag) =>
          tag.tag.startsWith(lastTag)
        );
        const newSuggestions = filteredTags.map((tag) => ({
          tag: tag.tag,
        }));
        setSuggestions(newSuggestions);
      }
    }

    // update description by calculating value of formula, if error then previous value of description will be shown and if no value then 0 will be shown in description and if no error then value will be shown in description
    let desc = data.description;
    try {
      // get tags values from content and replace with their values and then calculate
      const tags = data.content
        .split(/([+\-*/()^])/)
        .filter(Boolean)
        .filter((item) => !["+", "-", "*", "/", "(", ")", "^"].includes(item));
      const values = tags.map((tag) => {
        const tagValue = allTags.find((item) => item.tag === tag);
        return tagValue.value;
      });

      let formula = data.content
        .split(/([+\-*/()^])/)
        .filter(Boolean)
        .map((item) => {
          if (["+", "-", "*", "/", "(", ")", "^"].includes(item)) {
            return item;
          } else {
            const tagValue = allTags.find((tag) => tag.tag === item);
            return tagValue.value;
          }
        })
        .join("");

      // if at last of formula there is operator or bracket then remove it
      if (
        ["+", "-", "*", "/", "(", ")", "^"].includes(
          formula[formula.length - 1]
        )
      ) {
        formula = formula.slice(0, -1);
      }

      let result = eval(formula);
      desc = result;
    } catch (e) {
      console.log(e);
      // do nothing
    }

    charactersList.value = charactersList.value.map((item) => {
      if (item.id === data.id) {
        return {
          ...item,
          description: desc,
        };
      }
    });
  }, [contentRef?.current?.innerText]);

  return (
    <>
      <div
        ref={contentRef}
        className="formula-input"
        contentEditable={true}
        id="formula-input"
        onInput={handleKeyPress}
        //   onKeyPress={handleKeyPress}
        placeholder="Enter formula..."
      />
      {suggestions.map((suggestion, i) => (
        <div
          className="suggestion"
          key={i + "unique"}
          id={i}
          onClick={
            // enter text in contenteditable div
            (e) => {
              // if last character is not operator or bracket then remove last tag and add this e.target.innerText
              const lastChar =
                contentRef.current.innerText[
                  contentRef.current.innerText.length - 1
                ];
              if (!["+", "-", "*", "/", "(", ")", "^"].includes(lastChar)) {
                const lastTag = contentRef.current.innerText
                  .split(/([+\-*/()^])/)
                  .filter(Boolean)
                  .pop();
                const newContent = contentRef.current.innerText.replace(
                  lastTag,
                  e.target.innerText
                );
                contentRef.current.innerHTML = newContent;
              } else {
                contentRef.current.innerHTML += e.target.innerText;
              }
            }
          }
        >
          <span className="suggestion-tag">{suggestion.tag}</span>
        </div>
      ))}
    </>
  );
}

export default FormulaInput;
