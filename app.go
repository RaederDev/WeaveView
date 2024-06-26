package main

import (
	"context"
	"fmt"
	"weaveview/lib/weaviate"

	"github.com/weaviate/weaviate/entities/models"
)

type App struct {
	ctx                 context.Context
	weaviateConnections []*weaviate.WeaviateConnection
	connection_count    int
}

func NewApp() *App {
	return &App{
		weaviateConnections: make([]*weaviate.WeaviateConnection, 0, 5),
		connection_count:    0,
	}
}

func (b *App) startup(ctx context.Context) {
	fmt.Println("Starting up!")
	b.ctx = ctx
}

func (b *App) domReady(ctx context.Context) {
	fmt.Println("DOM is ready!")
}

func (b *App) shutdown(ctx context.Context) {
	fmt.Println("Shutting down!")
}

func (b *App) ConnectToWeaviate(host string, scheme string, httpPort int) (int, error) {
	fmt.Printf("Connecting to Weaviate at %s://%s:%d\n", scheme, host, httpPort)
	config := &weaviate.WeaviateConnectionConfig{
		Host:     host,
		Scheme:   scheme,
		HttpPort: httpPort,
	}
	connection, err := weaviate.NewWeaviateConnection(config)
	if err != nil {
		return 0, err
	}
	b.weaviateConnections = append(b.weaviateConnections, connection)
	b.connection_count += 1
	return b.connection_count, nil
}

func (b *App) TestConnection(host string, scheme string, httpPort int) bool {
	config := &weaviate.WeaviateConnectionConfig{
		Host:     host,
		Scheme:   scheme,
		HttpPort: httpPort,
	}
	connection, err := weaviate.NewWeaviateConnection(config)
	if err != nil {
		return false
	}
	health, err := connection.HealthCheck()
	return err == nil && health
}

func (b *App) HealthCheck(connectionId int) (bool, error) {
	if connectionId < 1 || connectionId > b.connection_count {
		return false, fmt.Errorf("invalid connection ID: %d", connectionId)
	}
	return b.weaviateConnections[connectionId-1].HealthCheck()
}

func (b *App) ListCollections(connectionId int) ([]weaviate.WeaviateCollectionInfo, error) {
	if connectionId < 1 || connectionId > b.connection_count {
		return nil, fmt.Errorf("invalid connection ID: %d", connectionId)
	}
	return b.weaviateConnections[connectionId-1].ListCollections()
}

func (b *App) GetCollectionItems(connectionId int, collectionName string, classProperties []string, batchSize int, offset int) (*models.GraphQLResponse, error) {
	if connectionId < 1 || connectionId > b.connection_count {
		return nil, fmt.Errorf("invalid connection ID: %d", connectionId)
	}
	return b.weaviateConnections[connectionId-1].GetCollectionItems(collectionName, classProperties, batchSize, offset)
}

func (b *App) GetCollectionItemCount(connectionId int, collectionName string) (*models.GraphQLResponse, error) {
	if connectionId < 1 || connectionId > b.connection_count {
		return nil, fmt.Errorf("invalid connection ID: %d", connectionId)
	}
	return b.weaviateConnections[connectionId-1].GetCollectionItemCount(collectionName)
}
