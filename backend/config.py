
# from sqlalchemy.engine import URL

# DB_USERNAME = "root"
# DB_PASSWORD = "Prinsi@1405"
# DB_HOST = "localhost"
# DB_PORT = 3306
# DB_NAME = "ai_interior_designer"

# SQLALCHEMY_DATABASE_URI = URL.create(
#     drivername="mysql+pymysql",
#     username=DB_USERNAME,
#     password=DB_PASSWORD,
#     host=DB_HOST,
#     port=DB_PORT,
#     database=DB_NAME,
# )

# SQLALCHEMY_TRACK_MODIFICATIONS = False
# SECRET_KEY = "InteriorDesigner123"

import os
from sqlalchemy.engine import URL

# =========================
# Simple Custom dotenv Parser
# =========================
def load_dotenv(path):
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" in line:
                    key, val = line.split("=", 1)
                    key = key.strip()
                    val = val.strip().strip('"').strip("'")
                    if key:
                        os.environ[key] = val

config_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(config_dir, ".env"))

# =========================
# Database Configuration
# =========================

DB_ENGINE = os.getenv("DB_ENGINE", "").lower()
DB_USERNAME = os.getenv("DB_USERNAME", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "Prinsi@1405")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", 3306))
DB_NAME = os.getenv("DB_NAME", "ai_interior_designer")

use_mysql = False
if DB_ENGINE == "mysql" or not DB_ENGINE:
    try:
        import pymysql
        conn = pymysql.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USERNAME,
            password=DB_PASSWORD,
            connect_timeout=3
        )
        with conn.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{DB_NAME}`")
        conn.close()
        use_mysql = True
    except Exception as e:
        print(f"[DB Config Notice] MySQL connection not established ({e}). Using local SQLite database.")

if use_mysql:
    SQLALCHEMY_DATABASE_URI = URL.create(
        drivername="mysql+pymysql",
        username=DB_USERNAME,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME,
    )
else:
    db_file_path = os.path.join(config_dir, "ai_interior_designer.db").replace("\\", "/")
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{db_file_path}"

SQLALCHEMY_TRACK_MODIFICATIONS = False

SECRET_KEY = os.getenv("SECRET_KEY", "InteriorDesigner123")

# =========================
# Email Configuration
# =========================

MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
MAIL_USE_TLS = str(os.getenv("MAIL_USE_TLS", "True")).lower() in ("true", "1", "yes")
MAIL_USE_SSL = str(os.getenv("MAIL_USE_SSL", "False")).lower() in ("true", "1", "yes")

MAIL_USERNAME = os.getenv("MAIL_USERNAME", "sudaniprinsi5@gmail.com").strip()
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD", "").strip()
MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER", "sudaniprinsi5@gmail.com").strip()