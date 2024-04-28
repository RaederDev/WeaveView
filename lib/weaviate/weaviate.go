package weaviate

import (
	"context"
	"strconv"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
)

type WeaviateConnectionConfig struct {
	Host     string
	Scheme   string
	HttpPort int
}

type WeaviateConnection struct {
	client *weaviate.Client
}

func NewWeaviateConnection(config *WeaviateConnectionConfig) (*WeaviateConnection, error) {
	connection := WeaviateConnection{}
	err := connection.configure(config)
	if err != nil {
		return nil, err
	}
	return &connection, nil
}

func (w *WeaviateConnection) HealthCheck() (bool, error) {
	return w.client.Misc().LiveChecker().Do(context.Background())
}

func (w *WeaviateConnection) ListCollections() ([]string, error) {
	schema, err := w.client.Schema().Getter().Do(context.Background())
	if err != nil {
		return nil, err
	}
	collections := make([]string, 0, 10)
	classes := schema.Classes
	for idx := range classes {
		collections = append(collections, classes[idx].Class)
	}
	return collections, nil
}

func (w *WeaviateConnection) configure(config *WeaviateConnectionConfig) error {
	client, err := weaviate.NewClient(weaviate.Config{
		Host:   config.Host + ":" + strconv.Itoa(config.HttpPort),
		Scheme: config.Scheme,
	})
	if err != nil {
		return err
	}
	w.client = client
	return nil
}
