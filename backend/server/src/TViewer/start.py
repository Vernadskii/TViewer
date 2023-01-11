import uvicorn


def start_server():
    uvicorn.run("TViewer.main:app", host="0.0.0.0", port=8090, log_level="info")


if __name__ == "__main__":
    start_server()
