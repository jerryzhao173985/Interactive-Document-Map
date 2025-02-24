# Interactive Document Map

This project provides an interactive map of documents, integrating data from various sources including database and SharePoint. It is designed to help users explore and filter a complex document system based on test types, subtypes, and additional metadata.

## Features

- **Interactive Map**: Visualize documents as nodes with links representing relationships. The map is powered by D3.js for a dynamic, user-friendly experience.
- **Document Filtering**: Filter documents by test type, subtype, or search query.
- **External Integrations**: Each document can include links to database, SharePoint, external resources, etc.
- **Data Import**: Automatic import of additional structured data from sample files (`sample_excel.json` and `sample_word.json`).
- **REST API**: Endpoints to access document and business rules data.

## Project Structure

- **server.js**: Main server file implemented using Express.js. It provides API endpoints and integrates with a JSON-based database using lowdb.
- **db.json**: Persistent JSON database storing document data.
- **public/**: Contains static files including the interactive HTML, JavaScript, and CSS for the map visualization.
- **data/**: Contains sample data files that are imported into the database.
- **rules.json**: Configurable file containing business rules that determine document styling and behavior in the map.
- **README.md**: This file.

## Getting Started

### Prerequisites

- Node.js v14 or later

### Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server with `node server.js`.
4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Usage

- **Interactive Map**: Use the filters to display specific document types based on test type or subtype. Click on a node to view detailed information, including external links to database and SharePoint.
- **Reload Data**: Use the "Reload Data" button to refresh the document dataset (useful if changes are made in the backend or imported data files).

## Integration with External Services

While this project currently imports document metadata from local files and provides links to external systems (database, SharePoint), future iterations could integrate directly with these services via their APIs.

## Customization

- **Business Rules**: Modify `rules.json` to alter the visual style and connection rules of the document map.
- **Document Data**: Customize `initialDocuments` in `server.js` as needed to better reflect the organization's document system.

## Future Enhancements

- **Direct API Integration**: Connect to database and SharePoint directly to fetch live document data.
- **Enhanced UI/UX**: Improve the front-end for animations, tooltips, and deeper interactivity.
- **Search & Analytics**: Implement advanced filtering and analytics on document usage and connections.

## Acknowledgments

- [D3.js](https://d3js.org/) for interactive visualizations.
- [Express.js](https://expressjs.com/) for the backend framework.
- [Lowdb](https://github.com/typicode/lowdb) for a simple JSON database.


