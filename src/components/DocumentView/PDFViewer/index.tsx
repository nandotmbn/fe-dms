import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { DOCUMENT_URL, URL_ENDPOINT } from "@/static";

export default function PDFViewer({
	documentName,
	withController = true,
}: {
	documentName: string;
	withController?: boolean;
}) {
	const defaultLayoutPluginInstance = defaultLayoutPlugin();
	return (
		<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.js">
			<div style={{ height: "100%" }}>
				<Viewer
					fileUrl={URL_ENDPOINT + DOCUMENT_URL + documentName}
					plugins={withController ? [defaultLayoutPluginInstance] : []}
				/>
			</div>
		</Worker>
	);
}
