package weaviate

import (
	"context"
	"strconv"

	"github.com/weaviate/weaviate-go-client/v4/weaviate"
	"github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
	"github.com/weaviate/weaviate/entities/models"
)

type WeaviateConnectionConfig struct {
	Host     string
	Scheme   string
	HttpPort int
}

type WeaviateConnection struct {
	client *weaviate.Client
}

type WeaviateCollectionInfo struct {
	CollectionName string
	Properties     []*models.Property
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

func (w *WeaviateConnection) GetCollectionItemCount(collectionName string) (*models.GraphQLResponse, error) {
	client := w.client
	meta := graphql.Field{
		Name: "meta", Fields: []graphql.Field{
			{Name: "count"},
		},
	}

	return client.GraphQL().Aggregate().
		WithClassName(collectionName).
		WithFields(meta).
		Do(context.Background())
}

func (w *WeaviateConnection) GetCollectionItems(collectionName string, classProperties []string, batchSize int, offset int) (*models.GraphQLResponse, error) {
	client := w.client
	fields := []graphql.Field{}
	for _, prop := range classProperties {
		fields = append(fields, graphql.Field{Name: prop})
	}
	fields = append(fields, graphql.Field{Name: "_additional { id vector }"})

	get := client.GraphQL().Get().
		WithClassName(collectionName).
		WithFields(fields...).
		WithLimit(batchSize)

	if offset != -1 {
		return get.WithOffset(offset).Do(context.Background())
	}
	return get.Do(context.Background())
}

func (w *WeaviateConnection) ListCollections() ([]WeaviateCollectionInfo, error) {
	schema, err := w.client.Schema().Getter().Do(context.Background())
	if err != nil {
		return nil, err
	}
	collections := make([]WeaviateCollectionInfo, 0, 10)
	classes := schema.Classes
	for idx := range classes {
		info := WeaviateCollectionInfo{
			CollectionName: classes[idx].Class,
			Properties:     classes[idx].Properties,
		}
		collections = append(collections, info)
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
