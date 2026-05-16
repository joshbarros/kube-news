{{/*
Expand the name of the chart.
*/}}
{{- define "kube-news.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a fully qualified app name.
If the release name already contains the chart name, use release name alone.
*/}}
{{- define "kube-news.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Chart label — name + version.
*/}}
{{- define "kube-news.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels applied to every resource.
*/}}
{{- define "kube-news.labels" -}}
helm.sh/chart: {{ include "kube-news.chart" . }}
{{ include "kube-news.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels — used in Deployment.spec.selector and Service.spec.selector.
*/}}
{{- define "kube-news.selectorLabels" -}}
app.kubernetes.io/name: {{ include "kube-news.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
In-cluster Postgres service hostname.
Resolves to "<release-name>-postgres" unless the user overrides database.externalHost.
*/}}
{{- define "kube-news.dbHost" -}}
{{- if .Values.database.externalHost }}
{{- .Values.database.externalHost }}
{{- else }}
{{- printf "%s-postgres" (include "kube-news.fullname" .) }}
{{- end }}
{{- end }}

{{/*
API and Web resource names.
*/}}
{{- define "kube-news.apiFullname" -}}
{{- printf "%s-api" (include "kube-news.fullname" .) | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "kube-news.webFullname" -}}
{{- printf "%s-web" (include "kube-news.fullname" .) | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Prisma connection URL. Password is URL-encoded to support special chars like '#'.
*/}}
{{- define "kube-news.databaseUrl" -}}
{{- printf "postgresql://%s:%s@%s:%v/%s" .Values.database.username (.Values.database.password | urlquery) (include "kube-news.dbHost" .) .Values.database.port .Values.database.name }}
{{- end }}
