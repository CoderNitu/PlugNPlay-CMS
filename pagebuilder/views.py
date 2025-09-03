from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Page, Section
from .serializers import PageSerializer, SectionSerializer

from rest_framework.views import APIView


class PageSectionsView(APIView):
    def get(self, request, pk):
        sections = Section.objects.filter(page_id=pk).order_by('order')
        serializer = SectionSerializer(sections, many=True)
        return Response(serializer.data)

class PageViewSet(viewsets.ModelViewSet):
    """
    API endpoint for CRUD operations on Page model.
    Includes nested sections for each page.
    """

    queryset = Page.objects.all()
    serializer_class = PageSerializer

    @action(detail=True, methods=["post"])
    def add_section(self, request, pk=None):
        """
        Custom endpoint to add a section to a page.
        """
        page = self.get_object()
        serializer = SectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(page=page)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SectionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for CRUD operations on Section model.
    """

    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
