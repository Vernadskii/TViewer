import uvicorn


def start_server():
    uvicorn.run("TViewer.main:app", port=8080, log_level="info")


if __name__ == "__main__":
    start_server()
