from flask import Flask, request, jsonify
import spacy

app = Flask(__name__)
nlp = spacy.load("ja_core_news_trf")


@app.route("/extract", methods=["POST"])
def extract_entities():
    text = request.json["text"]
    doc = nlp(text)

    entities, seen = [], set()

    for ent in doc.ents:
        if ent.text not in seen:
            entities.append({"text": ent.text, "type": ent.label_})
            seen.add(ent.text)

    return jsonify(entities)


if __name__ == "__main__":
    app.run(debug=True)
