from pathlib import Path
import json

import joblib
import pandas as pd

# Base path ke folder app/
BASE_DIR = Path(__file__).resolve().parents[1]
MODELS_DIR = BASE_DIR / "models"

# Load pipeline & label encoder
pipeline = joblib.load(MODELS_DIR / "xgb_telco_pipeline.pkl")
label_encoder = joblib.load(MODELS_DIR / "label_encoder.pkl")

# Load schema fitur
with open(MODELS_DIR / "feature_schema.json", "r") as f:
    FEATURE_SCHEMA = json.load(f)["features"]


def predict_recommendation(payload: dict) -> tuple[str, float]:
    """
    Menerima payload dari FastAPI (dict),
    mengubah ke DataFrame, lalu memanggil pipeline XGBoost.
    Mengembalikan: (nama_produk, confidence_score)
    """

    data = {k: payload[k] for k in FEATURE_SCHEMA}

    df = pd.DataFrame([data])

    pred_class = pipeline.predict(df)[0]
    proba = float(pipeline.predict_proba(df).max())

    product_name = label_encoder.inverse_transform([pred_class])[0]

    return product_name, proba
